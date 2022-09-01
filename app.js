const heroes = [
  {
    name: 'Luffy',
    maxHealth: 20,
    currentHealth: 20,
    attackPower: 5,
    pic: 'https://e7.pngegg.com/pngimages/492/729/png-clipart-monkey-d-luffy-one-piece-pirate-warriors-chibi-trafalgar-d-water-law-one-piece-chibi-child-hat.png',
    level: 1,
    gold: 0
  },
  {
    name: 'Zoro',
    maxHealth: 20,
    currentHealth: 20,
    attackPower: 5,
    pic: 'https://e7.pngegg.com/pngimages/604/88/png-clipart-one-piece-treasure-cruise-roronoa-zoro-monkey-d-luffy-franky-chibi-zoro-manga-fictional-character.png',
    level: 1,
    gold: 0
  },
]

const villains = [
  {
    name: 'Blackbeard',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 0,
    pic: 'https://e7.pngegg.com/pngimages/265/216/png-clipart-one-piece-pirate-warriors-3-monkey-d-luffy-trafalgar-d-water-law-marshall-d-teach-one-piece-piracy-cartoon.png',
    level: 1,
  }
]

let x = 5

function attackBoss(name) {
  let villain = villains.find(villain => villain.name == name)
  let totalAtackPower = 0

  heroes.forEach(hero => {
    totalAtackPower += hero.attackPower
  })
  villain.currentHealth -= totalAtackPower

  playerLVLup()
  bossLVLup()
  drawBossBox()
  drawPlayersBox()

}

function attackPlayer(attackPower) {
  let villain = villains.find(villain => villain.attackPlayer == attackPower)

  heroes.forEach(hero => {
    villain.attackPower = Math.floor((Math.random() * x) + 1),

      hero.currentHealth -= villain.attackPower
  })

  drawBossBox()
  drawPlayersBox()
}

function drawPlayersBox() {
  let playerBox = document.getElementById('Player')
  let template = ''

  heroes.forEach(hero => {
    if (hero.currentHealth > 0) {
      template += `
     <div class="text-light bg-dark col-3">
    <img class='heropic' src="${hero.pic}">
    <p>${hero.name}</p>
    <p>HEALTH: ${hero.currentHealth}</p>
    <p>LEVEL: ${hero.level}</p>
    <p>GOLD: ${hero.gold}</p>

    </div>`}
  })
  playerBox.innerHTML = template
}

function drawBossBox() {
  let bossBox = document.getElementById('boss')
  let template = ''

  villains.forEach(villain => {
    template += `
     <div class="text-light bg-dark col-3">
    <img onclick="attackBoss('${villain.name}')" class='heropic' src="${villain.pic}">
    <p>${villain.name}</p>
    <p>HEALTH: ${villain.currentHealth}</p>
    </div>`

  })
  bossBox.innerHTML = template
}

function bossLVLup(attackPower) {
  let villain = villains.find(villain => villain.bossLVLup == attackPower)

  if (villain.currentHealth <= 0) {
    villain.maxHealth += 50
    villain.currentHealth = villain.maxHealth
    x += 10
  }

  drawBossBox()

}

function playerLVLup(attackPower) {
  let villain = villains.find(villain => villain.playerLVLup == attackPower)

  if (villain.currentHealth <= 0) {
    heroes.forEach(hero => {
      hero.attackPower += Math.floor((Math.random() * 5) + 1)
      hero.maxHealth += Math.floor((Math.random() * 30) + 1)
      hero.currentHealth = hero.maxHealth
      hero.level += 1
      hero.gold += Math.floor((Math.random() * 20) + 1)
    })
  }
  drawPlayersBox()
}




drawBossBox()
drawPlayersBox()
setInterval(attackPlayer, 1000)

