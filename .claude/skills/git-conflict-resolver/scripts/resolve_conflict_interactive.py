#!/usr/bin/env python3
"""
交互式解决Git合并冲突

每次修改前都会征询开发者同意，显示变更预览。
"""

import subprocess
import sys
import re
import difflib
from pathlib import Path
from typing import Tuple, Optional


def show_diff_preview(original: str, resolved: str, file_path: str):
    """显示解决前后的差异预览"""
    print(f"\n{'='*80}")
    print(f"文件: {file_path}")
    print(f"{'='*80}")

    original_lines = original.splitlines(keepends=True)
    resolved_lines = resolved.splitlines(keepends=True)

    diff = difflib.unified_diff(
        original_lines,
        resolved_lines,
        fromfile=f'{file_path} (冲突前)',
        tofile=f'{file_path} (解决后)',
        lineterm=''
    )

    for line in diff:
        if line.startswith('+++') or line.startswith('---'):
            continue
        if line.startswith('@@'):
            print(f"\n{line}")
        elif line.startswith('+'):
            print(f"\033[32m{line}\033[0m", end='')
        elif line.startswith('-'):
            print(f"\033[31m{line}\033[0m", end='')
        else:
            print(line, end='')

    print(f"\n{'='*80}\n")


def get_user_confirmation(prompt: str, default: bool = False) -> bool:
    """获取用户确认"""
    default_text = "Y/n" if default else "y/N"
    response = input(f"{prompt} [{default_text}]: ").strip().lower()

    if not response:
        return default

    return response in ['y', 'yes', '是', '确认']


def resolve_conflict_file(file_path: str, strategy: str = 'manual', interactive: bool = True) -> Tuple[bool, str]:
    """
    交互式解决单个冲突文件

    Args:
        file_path: 冲突文件路径
        strategy: 解决策略 ('ours', 'theirs', 'manual', 'merge')
        interactive: 是否交互式确认

    Returns:
        (成功标志, 消息)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        if '<<<<<<<' not in original_content:
            return False, "文件没有冲突标记"

        if strategy == 'ours':
            resolved_content = resolve_ours(original_content)
        elif strategy == 'theirs':
            resolved_content = resolve_theirs(original_content)
        elif strategy == 'merge':
            resolved_content = resolve_merge(original_content)
        else:
            return False, "需要手动解决冲突"

        if interactive:
            show_diff_preview(original_content, resolved_content, file_path)

            if not get_user_confirmation(f"是否应用 '{strategy}' 策略解决此冲突?", default=False):
                print("已取消，文件未修改")
                return False, "用户取消操作"

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(resolved_content)

        return True, f"已使用 '{strategy}' 策略解决冲突"
    except Exception as e:
        return False, f"解决冲突时出错: {e}"


def resolve_ours(content: str) -> str:
    """保留当前分支的更改"""
    pattern = r'<<<<<<<[^\n]*\n(.*?)=======\n?(.*?)>>>>>>>[^\n]*\n?'
    return re.sub(pattern, r'\1', content, flags=re.DOTALL)


def resolve_theirs(content: str) -> str:
    """保留目标分支的更改"""
    pattern = r'<<<<<<<[^\n]*\n(.*?)=======\n?(.*?)>>>>>>>[^\n]*\n?'
    return re.sub(pattern, r'\2', content, flags=re.DOTALL)


def resolve_merge(content: str) -> str:
    """合并两个分支的更改（保留双方）"""
    pattern = r'<<<<<<<[^\n]*\n(.*?)=======\n?(.*?)>>>>>>>[^\n]*\n?'

    def merge_match(match):
        ours = match.group(1).strip()
        theirs = match.group(2).strip()

        if ours == theirs:
            return ours + '\n'

        merged = ours + '\n' + theirs
        return merged + '\n'

    return re.sub(pattern, merge_match, content, flags=re.DOTALL)


def mark_resolved(file_path: str) -> bool:
    """标记文件为已解决"""
    try:
        subprocess.run(
            ["git", "add", file_path],
            check=True,
            capture_output=True
        )
        return True
    except subprocess.CalledProcessError:
        return False


def main():
    """主函数"""
    if len(sys.argv) < 3:
        print("用法: resolve_conflict_interactive.py <file_path> <strategy> [--no-confirm]")
        print("策略: ours, theirs, merge, manual")
        print("选项: --no-confirm 跳过确认（不推荐）")
        sys.exit(1)

    file_path = sys.argv[1]
    strategy = sys.argv[2]
    interactive = '--no-confirm' not in sys.argv

    if not Path(file_path).exists():
        print(f"错误: 文件不存在: {file_path}", file=sys.stderr)
        sys.exit(1)

    success, message = resolve_conflict_file(file_path, strategy, interactive)

    if success:
        print(f"✓ {message}")

        if interactive:
            if get_user_confirmation("是否标记此文件为已解决?", default=True):
                if mark_resolved(file_path):
                    print(f"✓ 已标记文件为已解决: {file_path}")
                else:
                    print(f"⚠ 无法标记文件为已解决，请手动执行: git add {file_path}")
        else:
            if mark_resolved(file_path):
                print(f"✓ 已标记文件为已解决: {file_path}")
            else:
                print(f"⚠ 无法标记文件为已解决，请手动执行: git add {file_path}")
        return 0
    else:
        print(f"❌ {message}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
