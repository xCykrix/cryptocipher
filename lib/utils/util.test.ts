// trunk-ignore-all(eslint/@typescript-eslint/require-await): This rule is not needed in the testing suite.

// Pull the testing suite dependencies.
import { expect } from 'chai';
import { relative } from 'path';
import { count, generate } from './util';

// Initialize the test state.
const location = `./${relative(process.cwd(), __filename.replace('.test', ''))}`;

// Test 1: Validate integrity of the _snapshot.json exported information.
describe(`Side-by-side - Test 1 - Functional Integrity - '${location}'`, function () {
  it('should count 128 bytes', async function () {
    expect(count('󬎩񓤱𷉁򉾏󊁅󶝍񻰻򿐐󊹥󥙰𦢟񄲖􏅤󃸖𸥲󏭩󞧆򝲻󿲮󞐕򋭈񄕼򟪴福󯺁򁜥򗀔򴌙𙘐󱖑􅭠𶾅')).to.equal(128);
  });

  it('should count 512 bytes', async function () {
    expect(count('򳈚􊂈󅲥򾞯񣿩󕉛򚳤󓤬󥼩񱈖񱉆􂊥򣝬񇹐򍁓󖪇𱒈𯞗􎒭򫉮𾣣𞦔򺄶󟊧󋹟󒃿󈥾񉿸򧬛󽾬𚓽𡆸񰕸򸘦򩴮􌭼􀹑򞂣󱁺󕣧򀤃𵇀򨎻򌢭󙹼😍򟧺𕚘񈲂􀆹􆍊򔃺񮘣񏉇񟰞񢉂򘵚񯱑񯵭򯼑𡊹󠮌򥺞󫜼񡷲󷼨󸺤򓑽􇫆󤌕𘄆􎨹􅿡񔯟󅫎󇍜􃝳񴻎򀨠񉬜򅏗񭹴񒔻򽩏􁕺󗡈󵵵𾩹􅆱𮠙󔽥𺉼񨤩򄥽򯇇򑓈𚷈򒠩򶵒򾋱󯀴򺌱􇟦򡟫󫡦򲍓񳛃𘡶􈣤𹽷񊶐򀥎󩽍󍤫񻥞𦥬󩖚򌮸񎇥򉼕򣦽񒇵󔫄󘔳􄈌񹜖񡣠򠿶')).to.equal(512);
  });

  it('should count 225 bytes', async function () {
    expect(count('ᒡﵘ澮湶�쟈Ⴖ댟ﶙ쇪ࠁ�蘡孞晶뾬旈ꎸ揖䑁졐�塤⒒夆欒颯႘攟祈펠�덣泯砟䔅邘䊋ᆟﲺ䊶둣ꁜ髙Ꜳヮ᱌ⷎ꫘觌嚮ṱꞝ㠦㭿ꠓἝ港툈먒ᒡﵘ澮湶�쟈Ⴖ댟ﶙ')).to.equal(225);
  });

  it('should generate 128 bytes', async function () {
    expect(count(generate(128))).to.equal(128);
  });

  it('should generate 512 bytes', async function () {
    expect(count(generate(512))).to.equal(512);
  });

  it('should generate 225 bytes', async function () {
    expect(count(generate(225))).to.equal(225);
  });
});
