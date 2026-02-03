# What's for Dinner? MCP Server

What's for Dinner is a specialized Model Context Protocol (MCP) server designed to solve the age-old dilemma of deciding what to eat. Built specifically for the ChatGPT environment, it integrates directly into your conversation, allowing the AI to help you navigate through meal choices, restaurant selections, and recipe discoveries.

## How It Works

"What's for Dinner" is a specialized MCP server designed to integrate directly into your ChatGPT environment. It bridges the gap between a simple "I don't know" and a delicious meal by combining a curated database with real-time reasoning.

Key capabilities include:
* **Pick a restaurant** when you want to go out.
* **Pick a meal** for general inspiration.
* **Pick a recipe** for home cooking.
* **String them together**: 
    * Pick a meal → Find a place to eat it.
    * Pick a meal → Find a recipe for it.
    * Pick a restaurant → Find recipes for similar food.
    * Pick a recipe → Find a restaurant that serves it.

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Blackjax-Studio/whats-for-dinner.git
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
- Special thanks to Junie and the JetBrains team, Claude, and ChatGPT for their help building this project

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub at [Blackjax-Studio/whats-for-dinner](https://github.com/Blackjax-Studio/whats-for-dinner/issues)
- Check existing issues for solutions
- Join the [MCP community discussions](https://github.com/modelcontextprotocol/discussions)

## Roadmap

I don't have a formal roadmap yet. The plan is to first see how people like the project, gather feedback, and let those insights guide the future direction.

---

Made with ❤️ for indecisive dinner planners everywhere
