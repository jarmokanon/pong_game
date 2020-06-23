-------------------------------------------------------------------------------------------------------------
\ \        / ____| __ )   _ \   \     ___| |  / _ _|  ___|      \\ \        / ____|  ___|   _ \   \  | ____|
 \ \  \   /  __|   __ \  |   | _ \   |     ' /    | \___ \     _ \\ \  \   /  __|  \___ \  |   | |\/ | __|
  \ \  \ /   |     |   | ___/ ___ \  |     . \    |       |   ___ \\ \  \ /   |          | |   | |   | |
   \_/\_/   _____|____/ _|  _/    _\\____|_|\_\ ___|_____/  _/    _\\_/\_/   _____|_____/ \___/ _|  _|_____|
-------------------------------------------------------------------------------------------------------------

Stappenplan voor studenten die hun Webpack opstelling niet werkend hebben gekregen.
Volg de onderstaande stappen:



1) Pak de bestanden uit deze .zip en plaats ze in een directory naar keuze op jouw harde schijf
   (let op: niet in je mamp/xampp/vertrigo/of andere virtuele host graag!)

2) Open Visual Studio Code in administrator-modus

3) Open de terminal

4) Voer de onderstaande npm commando's uit

npm install        // Haalt alle node packages op en installeert ze in node_modules
npm audit fix      // Repareert een paar warnings (optioneel)
npm run start      // Start de applicatie en zou de browser moeten weergeven op localhost:3000 met een alert

5) Nu zou je de browser (bij voorkeur Chrome) door het laatste npm-commando automatisch opgestart moeten worden
   Bij iedere ctrl-s is te zien dat er gecompileerd wordt de terminal.
   Bij iedere stap zou het resultaat automatisch in de browser zichtbaar moeten zijn (geupdatet dus).
   Zie je de alert? Awesome...


Congrats, you are good to go...