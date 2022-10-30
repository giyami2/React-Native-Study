import axios from "axios";
import * as cheerio from "cheerio";


export const getCharacterInfoFromHtml = async (characterName) => {
    let encodedCharacterName = encodeURI(characterName);
    let requestUrl = `https://lostark.game.onstove.com/Profile/Character/${encodedCharacterName}`;

    return await axios.get(requestUrl).then(responsHtml => {
        const $ = cheerio.load(responsHtml.data);
        // character name
        const characterName = $("span.profile-character-info__name").text();
        // character server
        const server = $("span.profile-character-info__server").text();
        // job class
        const job = $("img.profile-character-info__img").attr("alt");
        const jobImg = $("img.profile-character-info__img").attr("src");
        // character img
        const characterImgHtml = $("div.profile-equipment__character").html();
        const characterImg = $("img", characterImgHtml).attr("src");
        // console.log(`닉네임 :  <${userName}> 서버 : <${server}> 직업 : <${job}>`);
        // Engrabing
        const engraveHtml = $("div.profile-ability-engrave").html();
        let engravingList = [];
        $("span", engraveHtml).each((_, da)=>{
            let engrave = $(da).text();
            // console.log(engrave);
            engravingList.push(engrave);
        });

        
        const jemsHtml = $("#profile-jewel").html();
        let jemsList = [];
        $(".jewel_btn", jemsHtml).each((_, da)=>{
            let jemKey = $(da).attr("id");
            let jemImg = $("img",da).attr("src");
            let jemLevel = $(".jewel_level",da).text();
            // console.log(jemKey);
            // console.log(jemImg);            
            // console.log(jemLevel.substring(3));
            let jemInfo = {
                key: jemKey,
                img: jemImg,
                level: jemLevel.substring(3)
            }
            jemsList.push(jemInfo);
        });

        const jemsDetailHtml = $("div.jewel-effect__list").html();

        $("li", jemsDetailHtml).each((_, da)=>{
            const liHtml = $(da).html();
    
            let dataGemKey = $("span", liHtml).attr("data-gemkey");
            jemsList.map(jemInfo => {
                if(jemInfo.key === dataGemKey){
                    let skillImg = $("img", liHtml).attr("src");
                    let skillName = $("font", liHtml).text();
                    let jemEffect = $("p.skill_detail", liHtml).text();

                    jemInfo.skillImg = skillImg;
                    jemInfo.skillName = skillName;                    
                    jemInfo.jemEffect = jemEffect.replace(skillName, "").trim();
                    
                    // console.log(jemInfo);
                    // console.log(skillName);
                    // console.log(jemEffect.replace(skillName, "").trim());
                }
            });
        });
        
        let response = {
            characterName: characterName,
            server: server,
            job: job,
            jobImg: jobImg,
            characterImg: characterImg,
            engravings: engravingList,
            jems: jemsList
        };
        return response;
    });
    // console.log(`https://lostark.game.onstove.com/Profile/Character/${encodeURI("휴지깡")}`);
  };