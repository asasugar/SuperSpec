#!/usr/bin/env python3
"""
批量交互式解决Git合并冲突

逐个处理冲突文件，每次修改前都征询开发者同意。
"""

import sys
import os
from pathlib import Path

script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))

from detect_conflicts import get_conflict_summary, analyze_conflict_file
from resolve_conflict_interactive import resolve_conflict_file, mark_resolved
from analyze_conflict import suggest_resolution_strategy


def process_conflicts_interactively():
    """交互式批量处理冲突"""
    print("正在检测冲突文件...\n")

    summary = get_conflict_summary()

    if not summary['has_conflicts']:
        print("✓ 未检测到冲突")
        return 0

    conflict_files = summary['conflict_files']
    print(f"检测到 {len(conflict_files)} 个冲突文件，共 {summary['total_conflicts']} 处冲突\n")

    resolved_count = 0
    skipped_count = 0

    for i, file_path in enumerate(conflict_files, 1):
        print(f"\n[{i}/{len(conflict_files)}] 处理文件: {file_path}")
        print("-" * 80)

        analysis = analyze_conflict_file(file_path)
        if 'error' in analysis:
            print(f"❌ 分析文件时出错: {analysis['error']}")
            continue

        print(f"冲突数量: {analysis['conflict_count']}")

        suggested_strategy = suggest_resolution_strategy(file_path)
        print(f"建议策略: {suggested_strategy}")

        if suggested_strategy == 'no_action':
            print("✓ 无需操作")
            continue

        print("\n可用策略:")
        print("  1. ours   - 保留当前分支的更改")
        print("  2. theirs - 保留目标分支的更改")
        print("  3. merge  - 智能合并双方更改")
        print("  4. skip   - 跳过此文件")
        print("  5. manual - 手动解决（不修改文件）")

        choice = input(f"\n选择策略 [默认: {suggested_strategy}]: ").strip().lower()

        if not choice:
            choice = suggested_strategy

        strategy_map = {
            '1': 'ours',
            '2': 'theirs',
            '3': 'merge',
            '4': 'skip',
            '5': 'manual'
        }

        strategy = strategy_map.get(choice, choice)

        if strategy == 'skip':
            print("⏭ 已跳过此文件")
            skipped_count += 1
            continue

        if strategy == 'manual':
            print("📝 请手动解决此文件的冲突")
            continue

        success, message = resolve_conflict_file(file_path, strategy, interactive=True)

        if success:
            print(f"✓ {message}")
            resolved_count += 1

            mark_choice = input("是否标记为已解决? [Y/n]: ").strip().lower()
            if not mark_choice or mark_choice in ['y', 'yes', '是']:
                if mark_resolved(file_path):
                    print(f"✓ 已标记文件为已解决")
                else:
                    print(f"⚠ 无法标记文件，请手动执行: git add {file_path}")
        else:
            print(f"❌ {message}")

    print(f"\n{'='*80}")
    print(f"处理完成:")
    print(f"  ✓ 已解决: {resolved_count} 个文件")
    print(f"  ⏭ 已跳过: {skipped_count} 个文件")
    print(f"  📝 待手动: {len(conflict_files) - resolved_count - skipped_count} 个文件")
    print(f"{'='*80}\n")

    return 0 if resolved_count > 0 else 1


def main():
    """主函数"""
    try:
        return process_conflicts_interactively()
    except KeyboardInterrupt:
        print("\n\n⚠ 操作已取消")
        return 1
    except Exception as e:
        print(f"\n❌ 发生错误: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
