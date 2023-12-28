# Real-Time Chat Messenger with NextJS 14

## Introduction

This project is a real-time chat messenger using the robust features of NextJS 14. It's designed to demonstrate a scalable, real-time application using various modern technologies.

## Features

- Real-time messaging
- Authentication using OAuth
- Responsive design

## Tech Stack

- **NextJS 14**: The React framework for production.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **shadcn/ui**: For sleek accessible component.
- **Pusher**: Real-time messaging service.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Redis**: In-memory data store used as a database, cache, and message broker.
- **Next-Auth**: Authentication for Next.js.

## Getting Started

1. **Clone the repository:**

```
git clone [repository-url]
```

2. **Install dependencies:**

```
npm install
```

3. **Set up environment variables:**
- Create a `.env.local` file in the root directory.
- Add your Pusher and Redis credentials and other necessary environment variables.

4. **Run the development server:**

```
npm run dev
```

## Usage

After running the development server, navigate to `http://localhost:3000` to view the application. Log in using Next-Auth and start sending real-time messages!

## Contributing

Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests to us.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE.md file for details.

## Acknowledgments

- Special thanks to NextJS, Pusher, and other technologies used in this project.

---

For more details on each technology, visit their respective documentation:

- [NextJS Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next-Auth Documentation](https://next-auth.js.org/)
- [Redis Documentation](https://redis.io/documentation)
- [Pusher Documentation](https://pusher.com/docs)
