document.addEventListener('DOMContentLoaded', function() {
    const findSizeButton = document.getElementById('find-size');
    const sizeResult = document.getElementById('size-result');
    
    findSizeButton.addEventListener('click', function() {
        const bust = parseFloat(document.getElementById('bust').value);
        const waist = parseFloat(document.getElementById('waist').value);
        const hips = parseFloat(document.getElementById('hips').value);
        
        if (isNaN(bust) || isNaN(waist) || isNaN(hips)) {
            sizeResult.textContent = 'Please enter all measurements';
            sizeResult.style.backgroundColor = '#ffcccc';
            return;
        }
        
        // Get all rows from the table (excluding header)
        const rows = Array.from(document.querySelectorAll('#measurements-table tbody tr'));
        
        // Find the best matching size
        let bestMatch = null;
        let lowestDifference = Infinity;
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowBust = parseFloat(cells[1].textContent);
            const rowWaist = parseFloat(cells[2].textContent);
            const rowHips = parseFloat(cells[3].textContent);
            
            // Calculate how well this size matches the input measurements
            const bustDiff = Math.abs(bust - rowBust);
            const waistDiff = Math.abs(waist - rowWaist);
            const hipsDiff = Math.abs(hips - rowHips);
            
            const totalDifference = bustDiff + waistDiff + hipsDiff;
            
            if (totalDifference < lowestDifference) {
                lowestDifference = totalDifference;
                bestMatch = {
                    size: cells[0].textContent,
                    international: cells[4].textContent
                };
            }
        });
        
        if (bestMatch) {
            sizeResult.innerHTML = `Your recommended size is: <strong>${bestMatch.size} (${bestMatch.international})</strong>`;
            sizeResult.style.backgroundColor = '#d4edda';
            
            // Highlight the matching row
            rows.forEach(row => row.classList.remove('highlighted'));
            rows.forEach(row => {
                if (row.cells[0].textContent === bestMatch.size) {
                    row.style.backgroundColor = '#d4edda';
                    // Scroll to the row
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    row.style.backgroundColor = '';
                }
            });
        }
    });
    
    // Make table rows responsive to hover on mobile
    const tableRows = document.querySelectorAll('#measurements-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            tableRows.forEach(r => r.classList.remove('active'));
            // Add highlight to clicked row
            this.classList.add('active');
        });
    });
});