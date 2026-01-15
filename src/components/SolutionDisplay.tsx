import React from 'react';
import type { SolutionResult } from '../types/matrix';
import { matrixToLatex } from '../utils/mathFormatter';
import LaTeXRenderer from './LaTeXRenderer';

interface SolutionDisplayProps {
    solution: SolutionResult;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
    if (solution.error) {
        const displayError = solution.error.replace(/\*/g, '').replace(/THE MATRIX IS SINGULAR/i, 'The matrix is singular');
        
        return (
            <div className="solution-display" style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>Error!</h2>
                <div style={{ 
                    backgroundColor: '#f5f5f5',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    padding: '25px',
                    minHeight: '150px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                        {displayError}
                    </p>
                    <p style={{ marginTop: '20px', color: '#333' }}>
                        {displayError.includes('singular') 
                            ? 'This matrix has no inverse because its determinant is zero.'
                            : 'Please check your input and try again.'}
                    </p>
                </div>
            </div>
        );
    }

    if (!solution.finalMatrix) {
        return null;
    }

    return (
        <div className="solution-display" style={{ padding: '40px 0' }}>
            <h2 style={{ color: '#4caf50', marginBottom: '20px', textAlign: 'center' }}>
                Final Result - Inverse Matrix
            </h2>
            <div style={{ 
                backgroundColor: '#f5f5f5',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '25px',
                minHeight: '150px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ 
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <LaTeXRenderer latex={matrixToLatex(solution.finalMatrix)} />
                </div>
            </div>
        </div>
    );
};

export default SolutionDisplay;
