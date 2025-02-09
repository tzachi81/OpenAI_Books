# Vercel Host
- This project is hosted in Vercel platform. Visit this link to play around with the app: https://xstate-machines-pvuk-git-vercel-host-prep-tzachis-projects.vercel.app?_vercel_share=8AhEvfP4ey7LmXNhbWEaiAB433uRK7eG
  
# About
This app gets random books list, shows it in cards visualization with pagination options.

It uses system state machine to turn the the app on/off.
The books state machine handles the data fetch logic, books category filters(author, genre...) and so on.

## Technologies 
+ **Build and serve**: [Vite](https://vite.dev/guide/) with React and TypeScript template.
+ **Logic and state management**: [xState](https://stately.ai/docs/xstate) logic and state management (I don't use Redux, Mobx or Context API here).
+ **Visual Design**: Scss modules, flexbox-based.

## Developers
+ Clone Repository: `git clone git@github.com:tzachi81/xstateMachines.git`
+ Install dependencies: `yarn install`
+ Build: `yarn build`
+ Run:  `yarn dev`