#!/usr/bin/env python3
"""
解决Git合并冲突

根据策略自动或半自动解决冲突文件。
"""

import subprocess
import sys
import re
from pathlib import Path
from typing import List, Optional, Tuple


def resolve_conflict_file(file_path: str, strategy: str = 'manual', interactive: bool = False) -> Tuple[bool, str]:
    """
    解决单个冲突文件

    Args:
        file_path: 冲突文件路径
        strategy: 解决策略 ('ours', 'theirs', 'manual', 'merge')
        interactive: 是否交互式确认（默认False，保持向后兼容）

    Returns:
        (成功标志, 消息)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if strategy == 'ours':
            resolved = resolve_ours(content)
        elif strategy == 'theirs':
            resolved = resolve_theirs(content)
        elif strategy == 'merge':
            resolved = resolve_merge(content)
        else:
            return False, "需要手动解决冲突"

        if interactive:
            import difflib
            print(f"\n文件: {file_path}")
            print("变更预览:")
            diff = difflib.unified_diff(
                content.splitlines(keepends=True),
                resolved.splitlines(keepends=True),
                fromfile=f'{file_path} (冲突前)',
                tofile=f'{file_path} (解决后)',
                lineterm=''
            )
            for line in diff:
                if line.startswith('+++') or line.startswith('---'):
                    continue
                print(line, end='')

            response = input(f"\n是否应用 '{strategy}' 策略? [y/N]: ").strip().lower()
            if response not in ['y', 'yes', '是', '确认']:
                return False, "用户取消操作"

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(resolved)

        return True, f"已使用 '{strategy}' 策略解决冲突"
    except Exception as e:
        return False, f"解决冲突时出错: {e}"


def resolve_ours(content: str) -> str:
    """保留当前分支的更改"""
    pattern = r'<<<<<<<.*?\n(.*?)\n=======.*?\n(.*?)\n>>>>>>>.*?\n'
    return re.sub(pattern, r'\1\n', content, flags=re.DOTALL)


def resolve_theirs(content: str) -> str:
    """保留目标分支的更改"""
    pattern = r'<<<<<<<.*?\n(.*?)\n=======.*?\n(.*?)\n>>>>>>>.*?\n'
    return re.sub(pattern, r'\2\n', content, flags=re.DOTALL)


def resolve_merge(content: str) -> str:
    """合并两个分支的更改（保留双方）"""
    pattern = r'<<<<<<<.*?\n(.*?)\n=======.*?\n(.*?)\n>>>>>>>.*?\n'

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
        print("用法: resolve_conflict.py <file_path> <strategy>")
        print("策略: ours, theirs, merge, manual")
        sys.exit(1)

    file_path = sys.argv[1]
    strategy = sys.argv[2]

    if not Path(file_path).exists():
        print(f"错误: 文件不存在: {file_path}", file=sys.stderr)
        sys.exit(1)

    success, message = resolve_conflict_file(file_path, strategy)

    if success:
        print(f"✓ {message}")
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
