# Sourcecode des 9A Discord Bots
## Syntax
### Testlauf
node run.js --test <token>
### Anwendungsfall
node run.js
Im Anwendunsfall wird das Token aus dem "run"-Wert in der tokens.json-Datei ausgelesen.

## Wie muss der Bot aufgesetzt werden
(Aktuell ist der Code für Linux ausgelegt!!)
Die Dateien in das Verzeichnis ``/bot`` ablegen und die Servicedatei in ``/etc/systemd/system`` verschieben, anschließend ``sudo systemctl daemon-reload && sudo systemctl enable dcbot.service`` ausführen.