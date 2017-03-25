describe('game', () => {
  before(() =>  {
    function mockFn () {}

    mockRender = {
      setConfig: function(){},
      print: chai.spy(mockFn)
    }

    mockCell = {
      x: 1,
      y: 1,
      alive: false
    }

    game = new Game(mockRender, 3, 3)
  })

  it("should start with  3x3 matrix", () => {
    expect(game.matrix.length).to.equal(3)
    expect(game.matrix[0].length).to.equal(3)
  })

  it("should not find neighbors at position (1,1)", () => {
    expect(game.neighbors(mockCell)).to.equal(0)
  })

  it("should  find 1 neighbor when (0,0) is alive and  mockCell is at (1,1)", () => {
    game.matrix[0][0].alive = true

    expect(game.neighbors(mockCell)).to.equal(1)
  })



  it("cell should die when there are more than 3 neighbors", () => {
    game.matrix[0][0].alive = true
    game.matrix[0][1].alive = true
    game.matrix[0][2].alive = true
    game.matrix[1][0].alive = true

    game.matrix[1][1].alive = true
    expect(game.nextStep().matrix[1][1].alive).to.equal(false)
  })

  it("should call print when render", () => {
    game.render()
    expect(mockRender.print).to.have.been.called()
  })

  it("should toggle cell state  when clickCellHandler", () => {
    game.matrix[1][1].alive = false
    game.clickCellHandler(1, 1)
    expect(game.matrix[1][1].alive).to.equal(true)
  })
})
