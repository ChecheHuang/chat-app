#git項目路徑
gitPath="/home/ubuntu/chat-app"
#git 網址
gitHttp="https://github.com/ChecheHuang/chat-app.git"

if [ -d "$gitPath" ]; then
        echo "我要開始了"
        cd $gitPath
        if [ ! -d ".git" ]; then
                echo "在該目錄下克隆 git"
                git clone $gitHttp gittemp
                mv gittemp/.git .
                rm -rf gittemp
        fi
        #拉取項目最新文件
        #git reset --hard origin/master
        git pull 
        echo "End"
        exit
else
        echo "該項目路徑不存在"
        echo "End"
        exit
fi