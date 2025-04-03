# divichartNext

## Overview
- 配当金を可視化するアプリです
### プロジェクト方針
- ミッション（使命・存在意義）
    - インカムゲインを重視する米国株投資家の資産形成モチベーション維持に貢献する
- ビジョン（将来像・あるべき姿）
    - 様々な観点からインカムゲインを視覚的に捉えることができる
- バリュー（価値観・行動指針）
    - 現状把握や分析に役立つ情報を集計しグラフとして表現する
## Requirement
- OS
    - Ubuntu 24.04
- Languages
    - Java
        - Amazon Corretto 17
    - TypeScript
### 使用技術・ツール
- バックエンド
    - フレームワーク
        - Spring Boot
    - ビルドツール
        - Maven
    - テスティングフレームワーク
        - JUnit
- フロントエンド
    - フレームワーク
        - Next.js
    - CSSフレームワーク
        - Tailwind CSS
    - グラフ描画ライブラリ
        - Chart.js
- DB
    - H2 Database Engine
- 静的解析
    - SonarQube
## Usage
1. アカウントを作成してログイン
2. 配当履歴一覧画面から配当履歴を登録
    - 登録方法
        1. 個別登録
            - ティッカー、配当金額、受取年月を手動で入力して登録
        2. 一括登録
            - CSVファイルを読み込ませて配当履歴を一括登録
            - 形式は下記の通り
3. 登録された配当履歴を自動集計して各画面で表示する

| 銘柄コード | 受取金額[円/現地通貨] | 入金日        |
|-------|--------------|------------|
| VYM   | 138.01       | 2023/12/25 |

## Features
- 手取り配当額をベースに集計してグラフとして表示する
- 主要機能
    - 配当ポートフォリオ
    - 年別配当グラフ
        - 過去数年間の配当を年毎に表示
    - 月別配当グラフ
    - 累計配当グラフ
        - 過去数年間の累計配当額を表示
    - 年間累計配当グラフ
    - 配当増加率グラフ
        - 前年比配当増加率を表示
    - 配当増加額グラフ
    - 配当達成率グラフ
        - 配当目標額に対する達成率を年毎に表示

## 起動方法
```bash
./mvnw clean package
```
```bash
java -jar ./target/divichart.jar
```
or
```bash
./mvnw clean spring-boot:run
```

### フロントエンド起動方法
```bash
cd frontend
```
```bash
npm run dev
```
## ローカル開発環境
### DEV用設定を使用する場合
- `spring.profiles.active=dev`を指定することで、DEV用の設定ファイル`application-dev.properties`の値が使用される
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=dev
```

### 画面表示
- http://localhost:8080 をブラウザで開く

## DB
- Embedded H2 Database を使用している
- H2コンソール表示
    - http://localhost:8080/h2-console
    - ※有効化している場合にのみ表示可能
### 前提
- DBデータ保存先のディレクトリが無い場合は、必要に応じて下記コマンドで作成すること

### H2コンソールを利用する場合
`application.properties`に設定`spring.h2.console.enabled=true`を書き加えるか、下記オプション付きのコマンドを実行すること
```bash
./mvnw clean spring-boot:run -Dspring-boot.run.arguments=--spring.h2.console.enabled=true
```
```bash
java -jar ./target/divichart.jar --spring.h2.console.enabled=true
```
### PRODでテーブルを作成する場合
下記コマンドで起動すると、
指定されたディレクトリにデータが作成される。
```bash
java -jar ./target/divichart.jar --spring.sql.init.mode=always --spring.sql.init.schema-locations=classpath:./sql/schema.sql
```


