# Modulee

Modulee is a modular synthesizer. It makes easy to create and share instruments
and effects for music production. It is free and open source. It can run both in
the web browser and as an audio plugin in a DAW.

<img width="1920" height="1080" alt="Screenshot"
src="https://github.com/user-attachments/assets/df48d676-cebe-4735-b2bc-8d757090cdbe"
/>

## Try it

To use it on the web browser access [https://module.app](https://modulee.app).
No installation required.

To download the audio plugin access
[https://module.app/plugin](https://modulee.app/plugin) and select the option
for your operational system.

## Running locally

To run as an web app locally:

1. Clone the repository
2. `npm install` to install the dependencies
3. **go to the `static` folder** and run `npm install` to install the audio
   backend dependencies
4. `docker compose up -d` to start the databases
5. Create a copy of `.env.example` named `.env`
6. `npx prisma migrate dev` to run the database migrations
7. `npm run dev` to start the server.
8. Open the url [http://localhost:5173](http://localhost:5173) on the browser

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
