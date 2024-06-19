Bot.on('message.group', async (e) => {
    try {
        let blacklist = await redis.get('FTC:blacklist');
        if (!blacklist) {
            const response = await fetch('https://gitee.com/adrae/Fanji-plugin/raw/api/blacklist/blacklist.json');
            const blacklistData = await response.json();
            blacklist = JSON.stringify(blacklistData.blacklist);
            await redis.set('FTC:blacklist', blacklist, { EX: 100 }); 
        }
        const parsedBlacklist = JSON.parse(blacklist);
        const userId = e.user_id.toString();
        for (const id of parsedBlacklist) {
            if (userId === id) {
                let q = await Bot.pickGroup(e.group_id).kickMember(e.user_id);
                if (!q) {
                    e.msg = ''
                    e.user_id = 0
                }
                break;
            }
        }
    } catch {
    }
});
