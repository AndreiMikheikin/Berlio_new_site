import { useState } from 'react';
import Button from '../../../Button/Button';
import '../../../../styles/components/ComplexComponents/Admin/SQLExplorer.scss';

export default function SQLExplorer() {
    const [sql, setSql] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const runQuery = async () => {
        if (!sql.trim()) {
            setError('Введите SQL-запрос');
            setResult(null);
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Пользователь не авторизован');
            setResult(null);
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/sql-explorer/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ sql }),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResult(data.rows || `Изменено строк: ${data.affectedRows ?? 0}`);
            }
        } catch (err) {
            setError('Ошибка выполнения запроса: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="aam_sql-explorer">
            <h2 className="aam_sql-title">SQL Explorer</h2>

            <textarea
                className="aam_sql-textarea"
                value={sql}
                onChange={e => setSql(e.target.value)}
                placeholder="Введите SQL-запрос"
            />

            <div className="aam_sql-actions">
                <Button type='submit' variant='white' label={loading ? 'Выполнение...' : 'Выполнить'} onClick={runQuery} disabled={loading} />
            </div>

            {error && <p className="aam_sql-error">{error}</p>}

            {result && (
                <div className="aam_sql-result">
                    {Array.isArray(result) ? (
                        <table className="aam_sql-table">
                            <thead>
                                <tr>
                                    {Object.keys(result[0] || {}).map((col, idx) => (
                                        <th key={idx}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((val, colIndex) => (
                                            <td key={colIndex}>{val === null ? 'NULL' : String(val)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>{result}</p>
                    )}
                </div>
            )}
        </div>
    );
}