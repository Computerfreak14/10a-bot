# Sourcecode des 9A Discord Bots
## Syntax
### Testlauf
``node run.js --test <token>``
### Anwendungsfall
node run.js
Im Anwendunsfall wird das Token aus dem "run"-Wert in der tokens.json-Datei ausgelesen.

## Wie muss der Bot aufgesetzt werden?
(Aktuell ist der Code für Linux ausgelegt!!)
Die Dateien in das Verzeichnis ``/bot`` ablegen (``git clone https://github.com/Computerfreak14/9a-bot.git``) und die Servicedatei (``bot.service``) in ``/etc/systemd/system`` verschieben, anschließend ``sudo systemctl daemon-reload && sudo systemctl enable bot.service`` ausführen.
