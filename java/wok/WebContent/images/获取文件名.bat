for /r D:\����֮ս\wok\WebContent\images %%i in (*.*) do @echo %%i>>test_list.txt
for %%i in (*.png) do echo %%~nxi >>image_list.txt
pause