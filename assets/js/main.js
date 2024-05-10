// main.js


const loginForm = document.querySelector('.login-form');
const modalReward = document.querySelector('.modalReward');

modalReward.innerHTML = 'chưa có phần thưởng!';
const colors = ['#feca54', '#fff3cd', '#feca54', '#fff3cd', '#feca54', '#fff3cd', '#feca54', '#fff3cd'];
const listGift = [
    {
        name: 'Bút bi',
        percent: 99 / 100,
        image: './assets/img/product-1.png',
    },
    {
        name: 'Sổ tay',
        percent: 1 / 100,
        image: './assets/img/product-2.png',
    },
    {
        name: 'Ba lô',
        percent: 0 / 100,
        image: './assets/img/product-3.png',
    },
    {
        name: 'Nón bảo hiểm',
        percent: 0 / 100,
        image: './assets/img/product-4.png',
    },
    {
        name: 'Bút bi',
        percent: 0 / 100,
        image: './assets/img/product-1.png',
    },
    {
        name: 'Sổ tay',
        percent: 0 / 100,
        image: './assets/img/product-2.png',
    },
    {
        name: 'Ba lô',
        percent: 0 / 100,
        image: './assets/img/product-3.png',
    },
    {
        name: 'Nón bảo hiểm',
        percent: 0 / 100,
        image: './assets/img/product-4.png',
    },
];
(() => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.wheel');
    const btnSpin = $('.spin-btn');
    let timer = 7000; // Thời gian cho mỗi lần quay
    let isRotating = false; // Đang quay hay không?
    let currentRotate = 0;
    const giftSize = listGift.length;
    const rotate = 360 / giftSize;
    const leftStyle = rotate/giftSize;
    const bottomStyle = rotate/2;
    const skewY = 90 - rotate; // Độ nghiêng của 1 item
    const renderGift = () => {

        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');
            itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
            itemGift.innerHTML = `
                <p class="text-item" style="
                    background-color: ${colors[index % colors.length]};
                    transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);
                ">

                </p>
                <img class="wheel-img" src="${item.image}"
                    style="
                        left: ${leftStyle}%;
                        bottom: ${bottomStyle}%;
                        transform: skewY(${skewY}deg)
                    " />
            `;
            wheel.appendChild(itemGift);
        })
    }
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    }
    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list = [];
        listGift.forEach((item, index) => {
            currentPercent += item.percent;
            randomNumber <= currentPercent && list.push({
                ...item, index
            });
        });
        return list[0];
    }
    const showGift = (gift) => {
        setTimeout(() => {
            isRotating = false;
            Swal.fire({
                title: 'Chúc mừng bạn đã trúng ' + gift.name,
                imageUrl: gift.image,
                imageHeight: 200
            })
            modalReward.innerHTML = `
            <p style="color: red; font-weight:bold">${gift.name}</p>
            <img class="img-modal" width="100" src="${gift.image}" />
            `;
        }, timer);
    }
    const spinner = () => {
        isRotating = true;
        const gift = getGift(Math.random());
        currentRotate += 360 * 10;
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    }
    btnSpin.addEventListener('click', () => {
        if (!isLoggedIn) {
            // alert('chua dang nhap')
            loginForm.style.display = 'flex';
        } else {
            !isRotating && spinner();
        }
    });
    
    renderGift();
})();

function resize() {
    var width = $(window).width();
    document.documentElement.style.setProperty('--size', width > 600 ? "500px" : (width / 1.1 - 32) + "px");
}
resize();