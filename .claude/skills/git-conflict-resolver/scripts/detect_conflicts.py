#!/usr/bin/env python3
"""
检测Git合并冲突

检测当前仓库中的冲突文件，并分析冲突类型。
"""

import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Tuple


def get_conflict_files() -> List[str]:
    """获取所有包含冲突标记的文件"""
    try:
        result = subprocess.run(
            ["git", "diff", "--check", "--diff-filter=U"],
            capture_output=True,
            text=True,
            check=False
        )

        conflict_files = []
        for line in result.stdout.splitlines():
            if ":" in line:
                file_path = line.split(":")[0].strip()
                if file_path and file_path not in conflict_files:
                    conflict_files.append(file_path)

        if not conflict_files:
            result = subprocess.run(
                ["git", "ls-files", "-u"],
                capture_output=True,
                text=True,
                check=False
            )
            for line in result.stdout.splitlines():
                parts = line.split()
                if len(parts) >= 4:
                    file_path = parts[3]
                    if file_path not in conflict_files:
                        conflict_files.append(file_path)

        return conflict_files
    except Exception as e:
        print(f"错误: 无法检测冲突文件: {e}", file=sys.stderr)
        return []


def analyze_conflict_file(file_path: str) -> Dict[str, any]:
    """分析单个冲突文件的详细信息"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        conflict_count = content.count('<<<<<<<')

        conflict_regions = []
        lines = content.splitlines()
        in_conflict = False
        conflict_start = 0

        for i, line in enumerate(lines, 1):
            if line.strip().startswith('<<<<<<<'):
                in_conflict = True
                conflict_start = i
            elif line.strip().startswith('>>>>>>>') and in_conflict:
                conflict_regions.append({
                    'start': conflict_start,
                    'end': i,
                    'ours': '\n'.join(lines[conflict_start:conflict_start+1]),
                    'theirs': '\n'.join(lines[i-1:i])
                })
                in_conflict = False

        return {
            'file': file_path,
            'conflict_count': conflict_count,
            'conflict_regions': conflict_regions,
            'file_size': len(content),
            'line_count': len(lines)
        }
    except Exception as e:
        return {
            'file': file_path,
            'error': str(e)
        }


def get_conflict_summary() -> Dict[str, any]:
    """获取冲突摘要信息"""
    conflict_files = get_conflict_files()

    if not conflict_files:
        return {
            'has_conflicts': False,
            'conflict_files': [],
            'total_conflicts': 0
        }

    file_analyses = []
    total_conflicts = 0

    for file_path in conflict_files:
        analysis = analyze_conflict_file(file_path)
        file_analyses.append(analysis)
        if 'conflict_count' in analysis:
            total_conflicts += analysis['conflict_count']

    return {
        'has_conflicts': True,
        'conflict_files': conflict_files,
        'file_analyses': file_analyses,
        'total_conflicts': total_conflicts
    }


def main():
    """主函数"""
    summary = get_conflict_summary()

    if not summary['has_conflicts']:
        print("✓ 未检测到冲突")
        return 0

    print(f"检测到 {len(summary['conflict_files'])} 个冲突文件，共 {summary['total_conflicts']} 处冲突:\n")

    for analysis in summary['file_analyses']:
        if 'error' in analysis:
            print(f"❌ {analysis['file']}: {analysis['error']}")
        else:
            print(f"📄 {analysis['file']}")
            print(f"   冲突数量: {analysis['conflict_count']}")
            print(f"   文件大小: {analysis['file_size']} 字节")
            print(f"   总行数: {analysis['line_count']}")
            if analysis['conflict_regions']:
                print(f"   冲突区域:")
                for region in analysis['conflict_regions']:
                    print(f"     - 行 {region['start']}-{region['end']}")
            print()

    return 1


if __name__ == "__main__":
    sys.exit(main())
