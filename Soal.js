// Soal no 1
function isPrimeNumber(numb) {
  let temp = [numb];
  let temp2 = {
    status: "",
    output: [],
  };
  // membuat output
  for (let i = 2; i <= numb; i++) {
    if (numb % i === 0) {
      temp.push(numb / i);
      temp2.output = temp;
    }
  }
  // Check apakah bilangan prima atau bukan
  if (temp2.output.length > 2) {
    temp2.status = "Bukan Bilangan Prima";
  } else {
    temp2.status = "Bilangan Prima";
  }
  return temp2;
}

console.log(isPrimeNumber(29));

// Soal no 2
function stars(numb) {
  let temp = "";
  // looping bintang ke bawah
  for (let i = 0; i <= numb; i++) {
    // Membuat space
    for (let j = 1; j <= numb - i; j += 1) {
      temp += " ";
    }
    // Menambah bintang ke kanan
    for (let k = 0; k < i; k++) {
      temp += "*" + " ";
    }
    // Membuat baris baru
    temp += "\n";
  }
  return temp;
}

console.log(stars(5));

// Soal no 5

/*
  1. Baba < Biba
  2. Umur Biba - Umur Baba = 8 tahun
  3. Umur Baki = 34 tahun + Umur Baba
  4. Umur Biba + Umur Baba + Umur Baki = 119 tahun
  5. Umur Baba + Umur Baki = ?

  Dari point 2 didapat
  Umur Biba = Umur Baba + 8 tahun
  
  Subtitusi ke point 4
  Umur Baba + 8 tahun + Umur Baba + Umur Baki = 119 tahun
  2 Umur Baba + Umur Baki = 111 tahun 
  
  Eliminasi dengan point 3
  2 Umur Baba + Umur Baki = 111 tahun
  Umur Baba - Umur Baki = - 34 tahun
  3 Umur Baba = 77
  Umur Baba = 25.67 tahun
  Umur Biba = 33.67 tahun
  Umur Baki = 59.67 tahun

*/
