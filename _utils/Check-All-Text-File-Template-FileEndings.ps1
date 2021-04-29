# Licensed to the .NET Foundation under one or more agreements.
# The .NET Foundation licenses this file to you under the MIT license.
# See the LICENSE file in the project root for more information.

# This script loop through all templates files to replace all line endings for the same one


# Filtering is done by file extension. We care about:
# *.appxmanifest
# *.cs
# *.csproj
# *.json
# *.md
# *.resw
# *.vb
# *.vbproj
# *.xaml
# *.xml
# *.ts
# *.tsx

Get-ChildItem -Path ..\templates -Recurse -Include *.appxmanifest, *.cs, *.csproj, *.json, *.md, *.resw, *.vb, *.vbproj, *.xaml, *.xml, *.ts, *.tsx |
ForEach-Object {
    Write-Host "Changing line ending of" $_.FullName;
    # ./set-eol.ps1 -lineEnding {mac|unix|win} -file $_.FullName
    ./set-eol.ps1 -lineEnding unix -file $_.FullName
}
