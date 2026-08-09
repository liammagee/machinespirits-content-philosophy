# @machinespirits/content-philosophy

Content package for the Machine Spirits learning platform.

## Repository role and publishing

This repo is the source of courses, essays, probes, notes, reading dispatches,
media, and publication metadata. Public HTML is rendered during the website
Docker build by the website-owned Techne renderer; no generated site mirror is
committed here.

Normal content releases begin here:

```bash
./validate
./publish --check
./publish -m "Describe the content update"
```

For a content-side preflight without staging or pushing, run `./publish --check`.
The content workflow validates each push without holding a write-capable token
for another repository. The website owns rendering and deployment: every
website release resolves and pins content `master`, and a scheduled drift check
deploys a newer validated content SHA when production differs.

## Overview

This package contains the Philosophy of Technology curriculum, including:

- **Courses**: Machine Learning and Human Learning, Philosophy of AI, and more
- **Research artifacts**: Public probes, course notes, and reading dispatches
- **Theme**: Custom branding, colors, and typography
- **Tutor Prompts**: Customized Ego/Superego agent prompts

## Local usage

For local website development, point `CONTENT_PACKAGE` at this checkout:

```bash
CONTENT_PACKAGE="../machinespirits-content-philosophy"
```

The package metadata remains available for tooling that consumes the repository
as a package. Production deployment does not resolve a floating npm version.

Legacy consumers can alternatively reference the package name in
`config/platform.yaml`:

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
├── probes/                # Evaluation protocols at /lab/probes
├── notes/                 # Public course notes at /notes
├── reading-room/          # Editorial sources rendered at /research/dispatches
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
