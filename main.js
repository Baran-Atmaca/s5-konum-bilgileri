import axios from "axios";

// Aşağıdaki Fonksiyonu değiştirmeyin.
async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.code2work.co/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

const ipAdresim = await ipAdresimiAl();
console.log(ipAdresim);

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.code2work.co/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/

async function getData() {
  const ip = await ipAdresimiAl();
  const response = await axios.get(`https://apis.code2work.co/ipgeoapi/${ip}`);
  return response.data;
}

/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(ipAdres) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("card");

  const bayrak = document.createElement("img");
  bayrak.src = `https://flaglog.com/codes/standardized-rectangle-120px/${ipAdres.ülkeKodu}.png`;

  const div = document.createElement("div");
  div.classList.add("card-info");

  const h3 = document.createElement("h3");
  h3.classList.add("ip");
  h3.textContent = ipAdres.sorgu;

  const p = document.createElement("p");
  p.classList.add("ulke");
  p.textContent = `${ipAdres.ülke} (${ipAdres.ülkeKodu})`;

  const pEnlem = document.createElement("p");
  pEnlem.textContent = `Enlem: ${ipAdres.enlem} - Boylam: ${ipAdres.boylam}`;

  const pSehir = document.createElement("p");
  pSehir.textContent = `Şehir: ${ipAdres.bölgeAdı}`;

  const pSaat = document.createElement("p");
  pSaat.textContent = `Saat dilimi: ${ipAdres.saatdilimi}`;

  const pPara = document.createElement("p");
  pPara.textContent = `Para birimi: ${ipAdres.parabirimi}`;

  const pISP = document.createElement("p");
  pISP.textContent = `ISP: ${ipAdres.isp}`;

  mainDiv.appendChild(bayrak);
  mainDiv.appendChild(div);

  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(pEnlem);
  div.appendChild(pSehir);
  div.appendChild(pSaat);
  div.appendChild(pPara);
  div.appendChild(pISP);

  return mainDiv;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});
