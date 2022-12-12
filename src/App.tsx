import { useState } from 'react'
import styles from './App.module.css';
import poweredBy from './assets/powered.png';
import { GridItem } from './components/GridItem';
import leftArrowImg from './assets/leftarrow.png';

import { levels, calculateImc, Level } from './helpers/imc'

const App = () => {
  const [altura, setAltura] = useState<number>(0);
  const [peso, setPeso] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = async () => {
    if (altura && peso) {
      setToShow(await calculateImc(altura, peso));
    } else {
      alert('Preencha todos os campos');
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setPeso(0);
    setAltura(0);
  };


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredBy} alt='' width={150} />
        </div>
      </ header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</ h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parametro adotado pela Organização Mundial
            de Saúde para calcular o peso ideal de cada pessoa.</ p>
          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.75 (em metros)"
            value={altura > 0 ? altura : ''}
            onChange={evento => setAltura(parseFloat(evento.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 68 (em kg)"
            value={peso > 0 ? peso : ''}
            onChange={evento => setPeso(parseFloat(evento.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {
                levels.map((item, index) => (
                  <GridItem key={index} item={item} />
                ))
              }
            </div>
          }
          {toShow &&
            <div className={styles.rightBig} onClick={handleBackButton}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImg} alt="" width={25} />
              </ div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default App;