document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("dblclick", function(e) { e.preventDefault(); }, { passive: false });

    // 札を混ぜる
    let fudaOrder = [...fudalist];
    fudaOrder = shuffleArray(fudaOrder)

    let startTime;
    let currentFuda = 0;

    // HTML要素の取得
    const imageElement = document.getElementById('random-image');
    const reloadButton = document.getElementById('reload-button');
    const poet = document.getElementById('poet');
    const poetButton = document.getElementById('poet-button');

    // 歌人の表示
    poetButton.addEventListener('click', function() {
        if (window.getComputedStyle(poet).display === 'none') {
            poet.style.display = 'flex';
        }
    });

    // 配列をシャッフルする
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // タイマーの停止・リセット
    function stopTimer() {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        alert(`終わりです。${minutes}分${remainingSeconds}秒でした！`);

        resetPage();
    }

    // 最初からボタンクリック時のイベント
    function reloadPage(){
        let flag = window.confirm("最初の状態に戻りますが、いいですか？");
        if(flag) {
            resetPage();
        }
    }

    // 状態のリセット
    function resetPage(){
        imageElement.src = './torifuda/tori_0.png';
        poet.textContent = '序歌：王仁';
        poet.style.display = 'none';
        currentFuda = 0;
        fudaOrder = shuffleArray(fudaOrder);
    }   

    // 札リストから選ばれた札を表示
    function displayFuda(order) {
        const fuda = fudaOrder[order];
        const isFlipped = Math.random() < 0.5;
        imageElement.src = isFlipped ? fuda.reverse : fuda.normal;
        document.getElementById('poet').innerHTML = fuda.poet;
    }

    // 画像クリック時のイベント
    imageElement.addEventListener('click', () => {
        if (currentFuda === 0) {
            startTime = Date.now();
            displayFuda(currentFuda);
            currentFuda++;
        } else if (currentFuda === 100) {
            stopTimer();
        } else {
            displayFuda(currentFuda);
            currentFuda++;
        }

        if (window.getComputedStyle(poet).display === 'flex') {
            poet.style.display = 'none';
        }
    });

    // 最初からボタンクリックでリロードイベント
    reloadButton.addEventListener('click', reloadPage);
});