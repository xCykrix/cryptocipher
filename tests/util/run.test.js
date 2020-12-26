const { expect } = require('chai')
const { count, generate } = require('../../dist/lib/utils/util')

describe('count: counts the number of bytes in a provided string', function () {
  it('should accurately count 128 bytes', function () {
    expect(count('󬎩񓤱𷉁򉾏󊁅󶝍񻰻򿐐󊹥󥙰𦢟񄲖􏅤󃸖𸥲󏭩󞧆򝲻󿲮󞐕򋭈񄕼򟪴福󯺁򁜥򗀔򴌙𙘐󱖑􅭠𶾅')).to.equal(128)
  })
  it('should accurately count 512 bytes', function () {
    expect(count('򳈚􊂈󅲥򾞯񣿩󕉛򚳤󓤬󥼩񱈖񱉆􂊥򣝬񇹐򍁓󖪇𱒈𯞗􎒭򫉮𾣣𞦔򺄶󟊧󋹟󒃿󈥾񉿸򧬛󽾬𚓽𡆸񰕸򸘦򩴮􌭼􀹑򞂣󱁺󕣧򀤃𵇀򨎻򌢭󙹼😍򟧺𕚘񈲂􀆹􆍊򔃺񮘣񏉇񟰞񢉂򘵚񯱑񯵭򯼑𡊹󠮌򥺞󫜼񡷲󷼨󸺤򓑽􇫆󤌕𘄆􎨹􅿡񔯟󅫎󇍜􃝳񴻎򀨠񉬜򅏗񭹴񒔻򽩏􁕺󗡈󵵵𾩹􅆱𮠙󔽥𺉼񨤩򄥽򯇇򑓈𚷈򒠩򶵒򾋱󯀴򺌱􇟦򡟫󫡦򲍓񳛃𘡶􈣤𹽷񊶐򀥎󩽍󍤫񻥞𦥬󩖚򌮸񎇥򉼕򣦽񒇵󔫄󘔳􄈌񹜖񡣠򠿶')).to.equal(512)
  })
  it('should accurately count 225 bytes', function () {
    expect(count('ᒡﵘ澮湶�쟈Ⴖ댟ﶙ쇪ࠁ�蘡孞晶뾬旈ꎸ揖䑁졐�塤⒒夆欒颯႘攟祈펠�덣泯砟䔅邘䊋ᆟﲺ䊶둣ꁜ髙Ꜳヮ᱌ⷎ꫘觌嚮ṱꞝ㠦㭿ꠓἝ港툈먒ᒡﵘ澮湶�쟈Ⴖ댟ﶙ')).to.equal(225)
  })
})

describe('generate: create an ASCII string of the requested byte length', function () {
  it('should accurately generate a 128 byte string', function () {
    expect(count(generate(128))).to.equal(128)
  })
  it('should accurately generate a 512 byte string', function () {
    expect(count(generate(512))).to.equal(512)
  })
  it('should accurately generate a 128 byte string', function () {
    expect(count(generate(225))).to.equal(225)
  })
})
