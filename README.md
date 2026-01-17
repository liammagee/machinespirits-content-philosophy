# @machinespirits/content-philosophy

Content package for the Machine Spirits learning platform.

## Overview

This package contains the Philosophy of Technology curriculum, including:

- **Courses**: Machine Learning and Human Learning, Philosophy of AI, and more
- **Theme**: Custom branding, colors, and typography
- **Tutor Prompts**: Customized Ego/Superego agent prompts

## Installation

```bash
npm install @machinespirits/content-philosophy
```

Or link locally during development:

```bash
npm link
# In platform directory:
npm link @machinespirits/content-philosophy
```

## Usage

Set the content package in your platform configuration:

```bash
CONTENT_PACKAGE="@machinespirits/content-philosophy"
```

Or in `config/platform.yaml`:

```yaml
content:
  package: "@machinespirits/content-philosophy"
```

## Structure

```
content-philosophy/
├── manifest.yaml          # Package manifest (entry point)
├── courses/               # Course content
│   ├── 479/              # Machine Learning and Human Learning
│   ├── 480/              # Philosophy of AI
│   └── .../
├── assets/               # Images, logos, media
├── theme/                # Colors, fonts
├── prompts/              # Custom tutor prompts
└── config/               # Navigation, features
```

## Customization

### Adding a Course

1. Create a new directory under `courses/`
2. Add `course.md` with YAML frontmatter
3. Add lecture files (`lecture-1.md`, etc.)

### Theming

Edit `theme/colors.yaml` and `theme/fonts.yaml` to customize the appearance.

### Tutor Prompts

Modify `prompts/tutor-ego.md` and `prompts/tutor-superego.md` to customize
how the AI tutor interacts with learners.

## License

MIT
