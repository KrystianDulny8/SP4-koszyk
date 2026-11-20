import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const produkty = [
    { id: 1, nazwa: 'Notes', cena: 12.50 },
    { id: 2, nazwa: 'Długopis', cena: 3.20 },
    { id: 3, nazwa: 'Plecak', cena: 89.00 },
    { id: 4, nazwa: 'Kalkulator', cena: 45.90 },
    { id: 5, nazwa: 'Zakreślacz', cena: 4.75 }
  ];

  const [koszyk, setKoszyk] = useState([]);

  const obliczSume = (aktualnyKoszyk) => {
    return aktualnyKoszyk.reduce((suma, pozycja) => suma + pozycja.cena * pozycja.ilosc, 0);
  };

  const wypiszStanWKonsoli = (aktualnyKoszyk) => {
    const suma = obliczSume(aktualnyKoszyk);
    console.log(`Koszyk: ${aktualnyKoszyk.length} pozycji; suma: ${suma.toFixed(2)}`);
  };

  const dodajDoKoszyka = (produkt) => {
    const czyIstnieje = koszyk.some((pozycja) => pozycja.id === produkt.id);
    let nowyKoszyk;

    if (czyIstnieje) {
      nowyKoszyk = koszyk.map((pozycja) =>
        pozycja.id === produkt.id
          ? { ...pozycja, ilosc: pozycja.ilosc + 1 }
          : pozycja
      );
    } else {
      nowyKoszyk = [...koszyk, { ...produkt, ilosc: 1 }];
    }

    setKoszyk(nowyKoszyk);
    wypiszStanWKonsoli(nowyKoszyk);
  };

  const usunZKoszyka = (idProduktu) => {
    const nowyKoszyk = koszyk.filter((pozycja) => pozycja.id !== idProduktu);
    setKoszyk(nowyKoszyk);
    wypiszStanWKonsoli(nowyKoszyk);
  };

const sumaCalkowita = obliczSume(koszyk);

 return (
    <div className="container mt-4">
      <h2>Sklepik szkolny</h2>
      <ul className="list-group mb-4">
        {produkty.map((produkt) => (
          <li
            key={produkt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {produkt.nazwa} – {produkt.cena.toFixed(2)} zł
            </span>
            <button type="button" class="btn btn-sm btn-primary"onClick={() => dodajDoKoszyka(produkt)}>Do koszyka</button>
          </li>
        ))}
      </ul>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>
      {koszyk.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Ilość</th>
                <th scope="col">Cena</th>
                <th scope="col">Suma</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {koszyk.map((pozycja) => (
                <tr key={pozycja.id}>
                  <td>{pozycja.nazwa}</td>
                  <td>{pozycja.ilosc}</td>
                  <td>{pozycja.cena.toFixed(2)} zł</td>
                  <td>{(pozycja.cena * pozycja.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => usunZKoszyka(pozycja.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold">Suma: {sumaCalkowita.toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}

export default App;