describe('Cell', function(){
  before(function(){
    cell = new Cell(1, 2)
  })
  it("should be dead by default", function(){
    expect(cell.alive).to.equal(false)
  })

  it("should be alive when toggle", function(){
    expect(cell.toggle().alive).to.equal(true)
  })

  it("should toggle state when click", function() {
    let currentState = cell.alive
    expect(cell.click().alive).to.equal(!currentState)
  })
})
