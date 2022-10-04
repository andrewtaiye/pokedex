import React from "react";
import ReactDOM from "react-dom";

import styles from "./StatModal.module.css";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter, setThreeDigits } from "../components/utility";

// <------------ Chart Components ------------>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Overlay = (props) => {
  const closeModal = () => {
    props.onClick(false);
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.card} ${styles.modal}`}>
        <header className={`${styles.header}`}>
          <span className={`${styles.headerText}`}>Base Stats</span>
        </header>
        <main className={`${styles.main} ${styles.grid}`}>
          {props.stats.map((element) => {
            return (
              <div key={Math.random()} className={`${styles.statContainer}`}>
                <div className={styles.stats}>
                  <Doughnut
                    width="100%"
                    data={{
                      datasets: [
                        {
                          data: [element.base_stat, 255 - element.base_stat],
                          backgroundColor: [
                            "rgba(255,255,255,1)",
                            "rgba(255,255,255,0)",
                          ],
                          borderWidth: [1, 0],
                          // rotation: 270,
                        },
                      ],
                      // labels: [element.stat.name],
                    }}
                  />
                  <div className={`${styles.statQuantum}`}>
                    {setThreeDigits(element.base_stat)}
                  </div>
                </div>
                <div className={`${styles.statName}`}>
                  {capitaliseFirstLetter(element.stat.name)}
                </div>
              </div>
            );
          })}
        </main>
        <footer className={`${styles.footer}`}>
          <button onClick={closeModal}>Close</button>
        </footer>
      </div>
    </div>
  );
};

export default function StatModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay onClick={props.onClick} stats={props.stats} />,
        document.querySelector("#stat-modal")
      )}
    </>
  );
}
