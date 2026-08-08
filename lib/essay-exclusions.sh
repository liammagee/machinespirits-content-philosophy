#!/usr/bin/env bash
# Shared loader for the content-owned public essay exclusion manifest.
# Source this file, then call load_essay_exclusions before essay_excluded.

ESSAY_EXCLUSION_PATTERNS=()

load_essay_exclusions() {
  local manifest="${1:-config/essay-exclusions.txt}"
  local line line_no=0

  if [ ! -f "$manifest" ]; then
    echo "essay exclusions: manifest not found: $manifest" >&2
    return 1
  fi

  ESSAY_EXCLUSION_PATTERNS=()
  while IFS= read -r line || [ -n "$line" ]; do
    line_no=$((line_no + 1))
    case "$line" in
      ""|\#*) continue ;;
    esac
    if [[ "$line" =~ [[:space:]] ]] || [[ ! "$line" =~ ^[A-Za-z0-9._*/-]+$ ]] \
      || [[ "$line" == /* ]] || [[ "$line" == *".."* ]]; then
      echo "essay exclusions: malformed pattern at $manifest:$line_no: $line" >&2
      return 1
    fi
    ESSAY_EXCLUSION_PATTERNS+=("$line")
  done < "$manifest"

  if [ "${#ESSAY_EXCLUSION_PATTERNS[@]}" -eq 0 ]; then
    echo "essay exclusions: manifest contains no patterns: $manifest" >&2
    return 1
  fi
}

essay_excluded() {
  local art="${1#articles/}"
  local pattern
  for pattern in "${ESSAY_EXCLUSION_PATTERNS[@]}"; do
    [[ "$art" == $pattern ]] && return 0
  done
  return 1
}
