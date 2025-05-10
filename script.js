form.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const location = document.getElementById('location').value.trim();
    const time = parseInt(document.getElementById('time').value);
    const cardPresent = document.getElementById('card-present').value;
  
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        location,
        time,
        card_present: cardPresent
      })
    })
    .then(response => response.json())
    .then(data => {
      const isFraud = data.fraud;
      const message = isFraud ? '⚠️ Fraud Detected!' : '✅ Transaction is SAFE';
      result.textContent = message;
      result.style.color = isFraud ? 'red' : 'green';
  
      addToTable(amount, location, time, cardPresent, message);
    })
    .catch(error => {
      result.textContent = '❌ Error contacting AI backend';
      result.style.color = 'orange';
      console.error('Error:', error);
    });
  });
  