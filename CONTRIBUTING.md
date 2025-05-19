# Contributing to ChromaticUI 🎨

Thank you for wanting to improve ChromaticUI! Here’s how you can do it:

## Getting Started 🚀

Before contributing, make sure you meet these requirements and set up your environment:

### Prerequisites

- Git: Version control system. [Install Git](https://git-scm.com/downloads)
- Node.js: JavaScript runtime. [Install Node.js](https://nodejs.org/en/download)
- pnpm: Package manager (alternative to npm/yarn). [Install pnpm](https://pnpm.io/installation)
- Visual Studio Code: Recommended code editor. [Install Visual Studio Code](https://code.visualstudio.com/download)

You should also be familiar with the following technologies:

- React: [Official documentation](https://react.dev/).
- Astro: [Getting started guide](https://docs.astro.build/en/getting-started/).
- Tailwind CSS: [Learn how to use it](https://tailwindcss.com/docs).

## How to Contribute 🤝

### 1. Set Up Your Environment

#### Fork the Repository

- Fork the project to your GitHub account to have your own copy. To do this:
- Click the `Fork` button at the top right of the repository page on GitHub.
- This will create a copy of the repository in your GitHub account.

#### Clone Your Fork

- Clone the repository to your local machine:

```bash
git clone <URL of your fork>
cd repo_name
```

#### Add the Original Repository as a Remote

- To keep your fork updated with changes from the original repository, add the original repository as a remote:

```bash
git remote add upstream <URL of the original repository>
```

#### Install Dependencies

- Install all necessary dependencies:

```bash
pnpm i
```

### 2. Work on Your Changes

#### Sync Your Fork

- Before starting, make sure your fork is up to date with the original repository:

```bash
# From the terminal:
git switch main
git fetch upstream
git merge upstream/main
```

You can also sync from GitHub by clicking Sync Fork on your fork’s page.

#### Create a New Branch

- Never work directly on main/master.
- Create a new branch for your changes. Use descriptive names:

```bash
git switch -c feature/your-improvement
```

Examples:

- `feature/new-function`
- `fix/fix-color-picker`
- `docs/update-readme`

#### Develop Your Changes

- Implement your changes or improvements on your local branch. Make sure to follow the project’s practices and standards.

#### Test Your Changes

- Run the development server to review your changes in real time:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test your changes.

### Submit Your Changes

#### 3. Commit Your Changes

- Commit your changes with a clear and descriptive message. Use the commit convention:

```bash
git commit -m "type description (preferably in English)"
```

- Use [Conventional Commits](https://www.conventionalcommits.org/) for clear messages:

```bash
git commit -m "type(scope): description (preferably in English)"
# Examples:
# - feat(picker): add OKCHL support
# - fix(generator): fix tone generation in Safari
# - docs(readme): update export instructions
```

#### Push to Your Fork

- Push your branch with the changes to your fork on GitHub:

```bash
git push origin feature/your-improvement
```

### Create a Pull Request (PR)

- Go to your fork on GitHub and click "Pull request".
- Clearly describe what changes you made and why they are necessary or useful for the project.
- Include screenshots if it affects the interface.
- Use relevant labels like `bug`, `enhancement`, `documentation`.

### Reporting Issues

- Bugs:
  - Use the `bug` label.
  - Describe how to reproduce the error.
  - Include OS, browser version, etc.
- Suggestions:
  - Use the `enhancement` label.
  - Explain why your idea would benefit the project.

## Best Practices 🌟

To ensure your contributions are useful and easy to integrate, follow these recommendations:

### 1. Check Open Issues

- Before starting work, check the [open issues](https://github.com/NSMichelJ/ChromaticUI/issues).
- If you find an issue you can solve and there’s no open PR for it, go ahead!
- Use #issue-number in your commit or PR to link it to the corresponding issue.

```bash
git commit -m "fix(generator): fix palette generation #123"
```

Leave a comment on the issue indicating you’re working on it. This helps avoid duplicates.

### 2. Check Open PRs

**Before opening a new PR:**

- Check open PRs to make sure you’re not working on something already in progress.
- If someone is already working on a similar change, you can collaborate:
  - Provide suggestions in the comments.
  - Help review their code.
  - Offer additional testing if needed.

### 3. Keep Your Commits Clean and Descriptive

- Commit your changes with a clear and descriptive message. Use the commit convention:

```bash
git commit -m "type description (preferably in English)"
```

- Use [Conventional Commits](https://www.conventionalcommits.org/) for clear messages:

```bash
git commit -m "type(scope): description (preferably in English)"
```

- feat: New features.
- fix: Bug fixes.
- docs: Documentation changes.
- style: Formatting changes.
- refactor: Code refactoring.

#### Example

```bash
git commit -m "feat(export): add export to Tailwind 4 with OKCHL #45"
```

### 4. Follow Project Conventions

- Astro: Keep files modular and componentized.
- React: Use functional components and hooks.
- Tailwind CSS: Prioritize Tailwind classes before writing custom CSS.

### 5. Update Your Branch Frequently

- To avoid conflicts, keep your branch synced with the project’s main branch.

### 6. Participate in Discussions

**If you receive comments or suggestions on your PR:**

- Respond promptly and participate actively in the conversation.
- Make the necessary changes and update your PR.
- If you need clarification, don’t hesitate to ask.

### 7. Document Your Changes

- If you add a new feature, update the relevant documentation (README, guides, etc.).
- Clearly explain how to use your new feature in the PR description.

## 📖 Code of Conduct

Respect and empathy are priorities in all interactions.

### Expected Values

- ✅ Respect:
  - Communicate kindly, even in disagreements.
  - Value others’ contributions, even if you disagree.
- ✅ Constructiveness:
  - Criticism should be solution-oriented, not personal.
  - Example: Instead of "This is wrong", try "What if we try X?".
- ✅ Inclusivity:
  - Avoid exclusive language (e.g., "for experts only").
  - Respect cultural, gender, and ability differences.

### Unacceptable Conduct

- ❌ Harassment:
  - Offensive comments, personal attacks, or discrimination.
- ❌ Toxic Language:
  - Humiliation, destructive sarcasm, or mockery.
- ❌ Spam or Disruption:
  - Unsolicited advertising, prolonged off-topic, or sabotage.

> ✨ Thank you for helping create the best color palette tool! 🎨
