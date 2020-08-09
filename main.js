document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Whats your Name?");
    console.log(yourName);
    if (yourName == null || yourName == "") {
        document.querySelector('.name span').innerHTML = "Unknown";
    } else {
        document.querySelector('.name span').innerHTML = yourName;

    }
    document.querySelector('.control-buttons').remove();

    // document.getElementById('start').play();

}
let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
console.log(blocks);
console.log(blocks.length);
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
mix(orderRange);
console.log(orderRange);

blocks.forEach((block, index) => {
    // console.log(index)
    block.style.order = orderRange[index];
    // add Click
    block.addEventListener('click', function () {
        FlipBlock(block);

    })
});

//  Flip Block function 
function FlipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        console.log("two");
        // stop click
        stopClick();
        // has matched
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}
// stop click
function stopClick() {
    // add class no click on contianer
    blocksContainer.classList.add('no-click');
    setTimeout(() => {
        // remove
        blocksContainer.classList.remove('no-click');
    }, duration);
}

// check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElements = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');

        // audio success
        document.getElementById('success').play();

    } else {

        triesElements.innerHTML = parseInt(triesElements.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

        // audio fail
        document.getElementById('fail').play();
    }
}

// shuffle function 
function mix(array) {
    let now = array.length;
    let save;
    let random;

    while (now > 0) {
        random = Math.floor(Math.random() * now);
        now--;
        // console.log(random);
        save = array[now];
        array[now] = array[random];
        array[random] = save;

    }
    return array;

}