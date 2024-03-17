# IT-Steering

## Opis aplikacije

IT-Steering je aplikacija, ki omogoča učinkovito upravljanje in spremljanje projektov v organizaciji. Sestavljena je iz več strani, ki zagotavljajo različne funkcionalnosti:

- **/**: Glavna stran, kjer lahko uporabniki pregledujejo in urejajo seznam projektov.
- **/project**: Stran za dodajanje novih projektov v sistem.
- **/login**: Stran za prijavo obstoječih uporabnikov.
- **/register**: Stran za registracijo novih uporabnikov v sistem.
- **/db**: Stran za upravljanje z začetnimi podatki aplikacije ter za izbris vseh podatkov iz sistema.

Na strani /db se ob kliku na gumb "Dodaj začetne podatke" doda pet primerov projektov in dva uporabniška računa:
- **admin** (geslo: admin), ki ima vse pravice, vključno z brisanjem projektov in spreminjanjem statusov,
- **user** (geslo: user), ki lahko dodaja projekte in si jih ogleduje.

Na strani /register se registrirajo navadni uporabniki.

## Navodila za zagon aplikacije

1. Klonirajte repozitorij.
2. Namestite odvisnosti za frontend in backend:
   ```bash
   cd client
   npm install
   npm run build
   cd ../server
   npm install
   ```
3. Zaženite strežnik:
   ```bash
   npm start
   ```

Aplikacija bo na voljo na [localhost:4000](http://localhost:4000).
