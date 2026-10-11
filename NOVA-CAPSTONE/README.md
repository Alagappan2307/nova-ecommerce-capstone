# NOVA — E-Commerce Capstone
 
A responsive, premium-style concept storefront built using HTML5,
CSS3, and modular JavaScript.

## Features

- Responsive layouts using CSS Grid and Flexbox
- Modular JavaScript architecture
- Client-side navigation using the History API
- Product catalog and product detail pages
- Category filtering and price/name sorting
- Product search
- Shopping bag with quantity management
- Cart persistence using localStorage
- Animated product cards and hero illustration
- Responsive mobile navigation
- Accessible labels, focus styles, and skip navigation
- Reduced-motion support
- Netlify and Vercel deployment configuration

## Technology

- HTML5
- CSS3
- JavaScript ES modules
- Browser History API
- localStorage

## Run locally

1. Clone or download this repository.
2. Open the folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click index.html.
5. Select Open with Live Server.

Do not open index.html directly as a file because this application
uses JavaScript ES modules.

## Deployment

### Netlify

1. Push the project to GitHub.
2. Import the repository into Netlify.
3. Set the publish directory to the project root.
4. Leave the build command empty.
5. Deploy.

### Vercel

1. Import the repository into Vercel.
2. Select Other as the framework preset.
3. Leave the build command empty.
4. Set the output directory to the project root.
5. Deploy.

## Demo limitations

This project demonstrates frontend commerce interactions.
Product information is local, and cart data is stored in the
visitor's browser.

Checkout and newsletter submission are demonstrations only.
No real orders, payments, or emails are processed.

A production store would require a backend, secure payment
integration, server-side validation, and a real database.

## Performance and accessibility

The application avoids external font requests and third-party
JavaScript dependencies. It includes responsive styling,
keyboard focus indicators, semantic page structure, and
reduced-motion support.

Lighthouse results must be tested on the actual running and
deployed version. A perfect score is not guaranteed in advance.
