import React from 'react';
import styles from './styles.module.css';
import CredsDisplay from '@/components/CredsDisplay';

function MovieLayout({ children }) {

    const renderTriangleSeats = (rows) => {
        const seatRows = [];
        for (let i = rows; i >= 1; i--) {
            const seats = [];
            const indentation = rows - i; // Number of dots to indent
            for (let j = 0; j < indentation; j++) {
                seats.push(<div className={styles.dot} key={`dot-${j}`}></div>);
            }
            for (let k = 1; k <= i; k++) {
                seats.push(<div className={styles.seat} key={`seat-${k}`}></div>);
            }
            seatRows.push(
                <div className={styles['seat-row']} key={i}>
                    {seats}
                </div>
            );
        }
        return seatRows;
    };

    return (
        <div className="relative">
            <div className="absolute">
                <CredsDisplay />
            </div>
            <div className={styles['theater-container']}>

                <h1 className={styles['movie-title']}>{ }</h1>
                <div className={styles['screen-container']}>
                    <div className={styles.screen}>
                        {children}
                    </div>
                </div>
                <div className={styles.stage}></div>
                <div className={styles.seats}>
                    {renderTriangleSeats(5)} {/* Adjust the number of rows as needed */}
                    <div className={styles['exit-door']}></div>
                </div>
            </div>
        </div>
    );
}

export default MovieLayout;
