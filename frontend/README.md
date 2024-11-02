# User Management Frontend

## Installation

	npm install

## Service starten
Um den Entwicklungsserver mit Hot-Reload zu starten, führen Sie den folgenden Befehl aus. Der Server ist dann erreichbar unter [http://localhost:8080](http://localhost:8080):

	npm run dev


## Dokumentation

1. Anlegen und Auflisten von Benutzerkonten (Attribute: Vorname, Nachname, E-Mail, Telefonnummer)
2. Anlegen und Löschen von Rollen (Rollenname)
3. Anlegen und Löschen von Rechten (Name des Rechts)
4. Zuweisung einer oder mehrerer Rollen an einen bestimmten Benutzer
5. Zuweisung eines oder mehrerer Rechte zu einer Rolle

### Offene Punkte

* Fehlerbehandlung muss noch implementiert werden
* Validierung der Fomulare
* Nachträgliches ändern von Daten (außer Rollen und Rechten)