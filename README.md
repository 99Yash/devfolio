# [Devfolio](https://devfolio-client.vercel.app/)

Portfolio generator for developers. Fully responsive. Enter information: get a good-looking portfolio instantly to share with your friends and potential recruiters.

## Built with

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Clerk.dev](https://clerk.com) for Authentication (Password less, Google & Github)
- [MongoDB](https://www.mongodb.com/) for storing user data.

## Features

- Authentication with Clerk
- Includes Work Experiences, Personal projects, an About section, and the option to add various social links such as Github, Twitter, and LinkedIn.
- Every Experience has a description property for addressing what the user did during his/her stint at the organization.
- Every Project has a Github link property and a Website link property for the deployed webapp/website.
- Special TechStack column to list your stack.
- Profile creation for individual users & the ability to add or update the user profile picture

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

### Installation

Use the package manager [yarn](https://https://yarnpkg.com/) to install the necessary dependencies.

```bash
yarn
```

### Add .env file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.
