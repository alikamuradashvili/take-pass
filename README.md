# Cargo Connect

Imported from `alikamuradashvili/cargo-connect` and installed as the main app in this repository.

## Run

```powershell
.\Start-App.bat
```

This starts the imported Vite app on port `8080`.

Or:

```powershell
npm install
npm run dev
```

## Google Authorization

To enable Google sign-in on the authorization page, create a local `.env` file from `.env.example` and set:

```powershell
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

In Google Cloud Console, add `http://localhost:8080` as an authorized JavaScript origin for your web client.

## Restart

```powershell
.\Restart-App.bat
```

This stops the process on port `8080` and starts the app again.

When started through `Start-App.bat`, press `R` to restart and `Q` to stop.
