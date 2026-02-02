# Contributing to What's for Dinner? MCP Server

Thank you for your interest in contributing! This document provides guidelines and information for contributing to this project.

## Code of Conduct

This project adheres to a simple code of conduct: be respectful, be constructive, and be collaborative. We welcome contributors of all skill levels.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (Node version, OS, MCP client used)
- **Error messages** or logs

Example bug report:
```markdown
**Bug**: Widget doesn't display on ChatGPT Desktop

**Steps to Reproduce**:
1. Configure MCP server in ChatGPT
2. Ask "help me pick dinner"
3. Widget fails to load

**Expected**: Interactive spinner widget appears
**Actual**: Error message in console

**Environment**:
- Node.js: v20.11.0
- ChatGPT Desktop: v1.2024.1
- OS: macOS 14.2

**Error Log**:
[paste error here]
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

- Use a clear and descriptive title
- Provide a detailed description of the proposed feature
- Explain why this enhancement would be useful
- Include mockups or examples if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit with clear messages** (see commit message guidelines below)
6. **Push to your fork** and submit a pull request

#### Pull Request Process

- Fill out the PR template completely
- Link any related issues
- Ensure all checks pass (linting, building, etc.)
- Wait for review from maintainers
- Address any requested changes
- Once approved, a maintainer will merge your PR

### First-Time Contributors

Look for issues labeled `good first issue` - these are great starting points for new contributors!

## Development Setup

1. **Fork and clone**:
```bash
git clone https://github.com/BlackjaxStudio/whats-for-dinner.git
cd whats-for-dinner
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create a branch**:
```bash
git checkout -b feature/your-feature-name
```

4. **Make changes and test**:
```bash
npm run build
npm start
# Test with MCP Inspector
npm run inspect
```

5. **Commit and push**:
```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

## Coding Standards

### TypeScript Style Guide

- Use **TypeScript** with strict mode enabled
- Follow the existing code style (we may add ESLint/Prettier in the future)
- Use **meaningful variable and function names**
- Add **JSDoc comments** for public APIs
- Keep functions **small and focused** (single responsibility)
- Prefer **functional programming** patterns where appropriate

### File Organization

- Place new tools in `src/mcp-tools/`
- Place new widgets in `src/mcp-widgets/`
- Place widget templates in `views/`
- Keep configuration in `src/config/`
- Data files go in `src/data/`
- Express routes in `src/routes/`

### Naming Conventions

- **Files**: camelCase (e.g., `pickRandomDinnerTool.ts`)
- **Classes/Interfaces**: PascalCase (e.g., `DinnerOption`)
- **Functions/Variables**: camelCase (e.g., `handleMcpRequest`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_OPTIONS`)

### Code Examples

**Good**:
```typescript
export const pickRandomDinnerTool = {
  name: "pick_random_dinner",
  config: {
    title: "Pick Random Dinner",
    description: "Randomly selects a dinner option from the database",
    inputSchema: pickRandomDinnerInputSchema,
  },
  handler: async (args: { cuisine?: string }) => {
    // Clear, focused logic
    const options = filterByCuisine(args.cuisine);
    return selectRandom(options);
  }
};
```

**Bad**:
```typescript
export const x = {
  name: "prd",
  config: { /* ... */ },
  handler: async (a) => {
    // Unclear, unfocused logic
    let x = getData();
    if (a.c) x = x.filter(i => i.c == a.c);
    return x[Math.floor(Math.random() * x.length)];
  }
};
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build config, etc.)

### Examples

```bash
feat(tools): add dietary restriction filtering
fix(widget): resolve spinner animation on Safari
docs(readme): add deployment instructions
refactor(server): simplify request logging
```

## Testing

Currently, this project doesn't have automated tests, but we encourage contributors to:

- Test manually with the MCP Inspector
- Test with multiple MCP clients (ChatGPT, Claude Desktop)
- Test edge cases and error conditions
- Document your testing process in the PR

**Future**: We plan to add:
- Unit tests with Jest/Vitest
- Integration tests for MCP tools
- E2E tests for widgets

## Adding New Features

### Adding a New Tool

1. Create schema in `src/mcpSchemas.ts`:
```typescript
export const yourToolInputSchema = {
  param: z.string().describe("Description"),
};
```

2. Create tool in `src/mcp-tools/yourTool.ts`:
```typescript
export const yourTool = {
  name: "your_tool_name",
  config: { /* ... */ },
  handler: async (args, extra) => { /* ... */ }
};
```

3. Register in `src/mcpServer.ts`:
```typescript
server.registerTool(
  yourTool.name,
  yourTool.config,
  yourTool.handler
);
```

### Adding New Dinner Options

Simply edit `src/meal-options.json`:

```json
{
  "name": "Dish Name",
  "cuisine": "Cuisine Type",
  "description": "Brief description"
}
```

Ensure the data follows the existing format and includes all required fields.

## Documentation

When adding features, please update:

- **README.md**: For user-facing features
- **Code comments**: For complex logic
- **This file**: For new development processes

## Questions?

- Check existing [GitHub Issues](https://github.com/BlackjaxStudio/whats-for-dinner/issues)
- Review [MCP documentation](https://modelcontextprotocol.io/)
- Open a new issue with the `question` label

## Recognition

Contributors will be recognized in:
- The README contributors section
- GitHub's contributors graph
- Release notes for significant contributions

Thank you for contributing! 🎉
