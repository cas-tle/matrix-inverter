import React from 'react';
import type { SolutionResult } from '../types/matrix';
import { matrixToLatex } from '../utils/mathFormatter';
import LaTeXRenderer from './LaTeXRenderer';

interface SolutionDisplayProps {
    solution: SolutionResult;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
    // Handle error case (singular matrix or other errors)
    if (solution.error) {
        return (
            <div className="solution-display" style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>⚠️ Error</h2>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                    {solution.error}
                </p>
                <p style={{ marginTop: '20px', color: '#ddd' }}>
                    {solution.error === 'The matrix is singular' 
                        ? 'This matrix has no inverse because its determinant is zero.'
                        : 'Please check your input and try again.'}
                </p>
            </div>
        );
    }

    // Handle success case (matrix has inverse)
    if (!solution.finalMatrix) {
        return null; // Don't render anything if no matrix
    }

    return (
        <div className="solution-display" style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ color: '#4caf50', marginBottom: '20px' }}>✅ Final Result - Inverse Matrix</h2>
            <div style={{ 
                backgroundColor: '#f5f5f5',
                border: '2px solid #ddd',
                borderRadius: '8px',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100px',
                margin: '20px 0'
            }}>
                <LaTeXRenderer latex={matrixToLatex(solution.finalMatrix)} />
            </div>
        </div>
    );
};

export default SolutionDisplay;