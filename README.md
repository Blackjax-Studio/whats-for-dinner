# What's for Dinner? MCP Server

A Model Context Protocol (MCP) server for the ChatGPT App Store that helps you decide what to eat! This server provides an interactive widget for choosing meals randomly from the app's database.

## Features

- 🎲 **Random Dinner Picker**: Randomly selects from the app's database of meal options
- 🤖 **ChatGPT Integration**: Let ChatGPT pick the meals or the restaurants and then What's for Dinner will choose out of ChatGPT's created list
- 🎨 **Interactive UI Widget**: Exciting animation that cycles through meal options before landing on your dinner choice, with quick-action buttons for recipes, restaurants, or spinning again

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/BlackjaxStudio/whats-for-dinner.git
cd whats-for-dinner
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file and configure:
```bash
cp .env.example .env
```

4. Edit `.env` with your settings:

5. Build and start the server:
```bash
npm start
```

The server will be running at `http://localhost:8787/mcp`

### Testing with MCP Inspector

The MCP Inspector is a great tool for testing your server locally:

```bash
npm run inspect
```

This opens a web interface where you can test tool calls and see responses.

## Deployment

### Using ngrok (Development/Testing)

1. Install ngrok: https://ngrok.com/download
2. Start your server locally
3. Expose it with ngrok:
```bash
ngrok http 8787
```
4. Update `APP_URL` in `.env` with the ngrok URL
5. Restart the server


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features (when test suite is added)
- Update documentation as needed
- Keep commits atomic and well-described

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk)
- Inspired by the everyday struggle of "what's for dinner?"
- Special thanks to Junie, Claude, and ChatGPT for their help building this project

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub at [BlackjaxStudio/whats-for-dinner](https://github.com/BlackjaxStudio/whats-for-dinner/issues)
- Check existing issues for solutions
- Join the [MCP community discussions](https://github.com/modelcontextprotocol/discussions)

## Roadmap

I don't have a formal roadmap yet. The plan is to first see how people like the project, gather feedback, and let those insights guide the future direction.

---

Made with ❤️ for indecisive dinner planners everywhere
