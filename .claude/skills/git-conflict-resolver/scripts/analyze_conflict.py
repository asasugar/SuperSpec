#!/usr/bin/env python3
"""
分析Git冲突的详细信息

提供冲突的上下文信息，帮助决定解决策略。
"""

import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional


def get_conflict_context(file_path: str, conflict_line: int, context_lines: int = 5) -> Dict[str, any]:
    """获取冲突区域的上下文"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        start = max(0, conflict_line - context_lines - 1)
        end = min(len(lines), conflict_line + context_lines)

        context_before = ''.join(lines[start:conflict_line-1])
        context_after = ''.join(lines[conflict_line:end])

        return {
            'context_before': context_before,
            'context_after': context_after,
            'line_range': (start + 1, end)
        }
    except Exception as e:
        return {'error': str(e)}


def analyze_conflict_type(file_path: str) -> str:
    """分析冲突类型"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        conflict_count = content.count('<<<<<<<')

        if conflict_count == 0:
            return 'no_conflict'

        lines = content.splitlines()
        has_additions = False
        has_deletions = False

        for line in lines:
            if '<<<<<<<' in line:
                has_additions = True
            if '=======' in line:
                has_deletions = True

        if has_additions and has_deletions:
            return 'content_conflict'
        elif has_additions:
            return 'addition_conflict'
        else:
            return 'unknown'
    except Exception as e:
        return f'error: {e}'


def get_file_history(file_path: str) -> Dict[str, any]:
    """获取文件的Git历史信息"""
    try:
        result = subprocess.run(
            ["git", "log", "--oneline", "-5", "--", file_path],
            capture_output=True,
            text=True,
            check=False
        )

        commits = []
        for line in result.stdout.splitlines():
            if line.strip():
                commits.append(line.strip())

        return {
            'recent_commits': commits,
            'commit_count': len(commits)
        }
    except Exception as e:
        return {'error': str(e)}


def suggest_resolution_strategy(file_path: str) -> str:
    """根据冲突分析建议解决策略"""
    conflict_type = analyze_conflict_type(file_path)

    if conflict_type == 'no_conflict':
        return 'no_action'

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        conflict_regions = []
        lines = content.splitlines()
        in_conflict = False
        conflict_start = 0

        for i, line in enumerate(lines):
            if '<<<<<<<' in line:
                in_conflict = True
                conflict_start = i
            elif '=======' in line and in_conflict:
                ours_content = '\n'.join(lines[conflict_start+1:i])
            elif '>>>>>>>' in line and in_conflict:
                theirs_content = '\n'.join(lines[conflict_start+2:i])

                ours_lines = len(ours_content.splitlines())
                theirs_lines = len(theirs_content.splitlines())

                if ours_content.strip() == '':
                    return 'theirs'
                elif theirs_content.strip() == '':
                    return 'ours'
                elif ours_content == theirs_content:
                    return 'ours'
                else:
                    return 'manual'

        return 'manual'
    except Exception as e:
        return 'manual'


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("用法: analyze_conflict.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]

    if not Path(file_path).exists():
        print(f"错误: 文件不存在: {file_path}", file=sys.stderr)
        sys.exit(1)

    conflict_type = analyze_conflict_type(file_path)
    strategy = suggest_resolution_strategy(file_path)
    history = get_file_history(file_path)

    print(f"文件: {file_path}")
    print(f"冲突类型: {conflict_type}")
    print(f"建议策略: {strategy}")

    if 'recent_commits' in history:
        print(f"\n最近提交历史:")
        for commit in history['recent_commits']:
            print(f"  - {commit}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
