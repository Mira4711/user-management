# User Management Backend

## Installation

	npm install

## Datenhaltung
Die Datenhaltung erfolgt direkt auf der Festplatte in JSON Dateien. Somit ist kein zusätzlicher Datenspeicher erforderlich. 
Dies ist nur eine Konfiguration für kleine Datenmengen, bei größeren Datenmengen, wird das Dateisystem unperformant und eine Umstellung auf eine Datenbank erforderlich. 

## Service starten

	npm run start

Service kann auf gerufen werden unter http://localhost:3000/

## Dokumentation

Der REST Service ist in [YAML](./api.yaml) beschrieben. Die Datei kann in einem [SwaggerEditor](https://editor.swagger.io/) geöffnet werden. 

### Offene Punkte

* Validierung der erhaltenen Daten muss noch implementiert werden
* Nachträgliches ändern von Daten (außer Rollen und Rechten)