# Client Upsert Dialog Memory

- The client dialog now supports both create and edit flows.
- Selecting a client row from the client directory opens the dialog pre-filled with that client's information.
- The floating add button still opens a blank dialog for creating a new client.
- Saving a dialog with an existing client id updates the client; otherwise it creates a new client.
- The form hydrates from the provided client data and the route action handles create vs. update.
