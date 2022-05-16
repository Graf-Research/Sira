# Sira UI-Builder Programming Language

Sira is a mini programming language with purpose of building web user interface (UI) with only essentials and minimal as possible logic codes needed to write.

Sira use query-heavy based approach for data transaction. Each data transaction query need to be defined outside system to support Sira system.

Syntax use indentation-strict syntax using two spaces as indentation.

## Table of Contents
* [How to](#how-to)
* [Structure](#structure)
* [Page](#page)
* [Param](#param)
* [Data](#data)
  + [Row](#row)
  + [Table](#table)
* [View](#view)
  + [Table](#table-1)
    - [Data Column](#data-column)
    - [Column Data Type](#column-data-type)
    - [Button](#button)
  + [Form](#form)
  + [Multiform](#multiform)
  + [Button](#button-1)
* [Statement](#statement)
  + [Query](#query)
    - [Single Row Query](#single-row-query)
    - [Multi Rows Query](#multi-rows-query)
  + [Variable Assignment](#variable-assignment)
  + [Goto Page](#goto-page)
  + [Confirm](#confirm)
  + [Alert](#alert)
* [Full Code Example](#full-code-example)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## How to

Install dependencies
```
npm install
```

Test Parser
```
npm test
```

## Structure
```
page <Page Name>
 |
 |
 +--- [param]
 |      |
 |      +---- page parameters
 |
 +--- [data]
 |      |
 |      +---- list of Variable Assignment
 |
 +--- [view]
        |
        +---- list of UI Component
                |
                +---- table
                |
                +---- form
                |
                +---- multiform
                |
                +---- button 

page <Another Page>

page <Another Another Page>

...
```

## Page

Page declaration require page name as parameter., e.g. page name = `My First Page`, then written as below
```
page My First Page
```

## Param

Page parameter declared on `[param]` section preceed by two spaces (as tab indentation, but don't use tab character `\t` use spaces instead), with prefix `$`, e.g.

```
$param
```

```
page My First Page
  [param]
    $first_param
    $second_param
    $page_id
```

## Data

Sira data type consist of two types of data:
- Row
- Table

Row is a single row of table data, and table contains one or more rows.

### Row

Row can be declared either as an empty row or using query data. Row declaration followed by variable name then value of row.

Empty row assigned using empty parenthesis `()`

```
row var1 = ()
```

```
page My First Page
  [param]
    ...

  [data]
    row var1 = ()
```

Non-empty valued row use query as its value

```
row var2 = query 'Get One User'
```

```
page My First Page
  [param]
    ...

  [data]
    row var2 = query 'Get One User'
```

### Table

Like row, table can be declared by empty value or using query data.

Empty table assigned using empty square brackets `[]`

```
table var3 = []
```

```
page My First Page
  [param]
    ...

  [data]
    table var3 = []
```

Non-empty valued table use query as its value

```
table var4 = query 'Get All User'
```

```
page My First Page
  [param]
    ...

  [data]
    table var4 = query 'Get All User'
```

## View

All views component automatically rendered top down vertical.

### Table

Table component requires two parameters: `source data variable` as main table data and `table name`. Source data is written inside parenthesis and followed by table name without parenthesis.

```
table (var4) My Table Name
```

Table items declared on new line after with two spaces ahead. Each table items can be a data column or a button or both.

#### Data Column

Data column source data can use table `source data variable` or `main page data variable` as long as on the same page. Data column is written by following format

`-` `Column label/name` `<colon>` `<column source data>` `column type`

Example
```
page My First Page
  [param]
    ...

  [data]
    table var4
    row var1

  [view]
    table (var4) My Table Name
      - Nama: var4.nama text
      - Harga: var4.harga numeric
      - Col2: var1.x text
```

#### Column Data Type 

| Column Type | Parameter(s)                                         | Syntax          |
|-------------|------------------------------------------------------|-----------------|
| Text        | none                                                 | text            |
| Bigger Text | none                                                 | bigtext         |
| Number      | none                                                 | numeric         |
| Dropdown    | dropdown data source with column `label` and `value` | dropdown(var1)  |


#### Button

Button click action will execute statements inside curly brackets. Button is written by following format

`-` `Button label/name` `{` `new line` `tabs` `<statements>` `new line` `}`

Example
```
page My First Page
  [param]
    ...

  [data]
    row var1
    table var4

  [view]
    table (var4) My Table Name
      - Ubah {
        alert Berhasil
        goto Ubah Produk ($id = var1.x)
      }
      - Simpan {
        alert Berhasil
        goto Ubah Produk ($id = var1.x)
      }
```

### Form

Form component will be rendered as input form with title and input items. Form requires title/label as parameter. Each items declared similar like table's items.

Example
```
page My First Page
  [param]
    ...

  [data]
    row produk

  [view]
    form Detail Produk
      - Nama: produk.nama text
      - Harga: produk.harga numeric
      - Deskripsi: produk.deskripsi bigtext
```

### Multiform

Multiform rendered as dynamic multiple Form. Syntax declared similar like Form, but with additional `multiform data variable` inside parenthesis with type of table. `Multiform data variable` will be used as source and target data of multiform.

Example
```
page My First Page
  [param]
    ...

  [data]
    table daftar_produk = query 'Opsi Produk'
    table daftar_detail_order

  [view]
    multiform (daftar_detail_order) Detail Order
      - Produk: daftar_detail_order.produk_id dropdown(daftar_produk)
      - Jumlah: daftar_detail_order.kuantitas numeric
      - Diskon: daftar_detail_order.diskon numeric
```

### Button

Button require label as parameter. Button actions written as statements inside curly bracket preceed by label parameter.

Example
```
page My First Page
  [param]
    $id

  [data]
    ...

  [view]
    button Hapus Order {
      confirm Yakin menghapus order ini?
      query 'Hapus order by id' ($1 = $id)
      goto Daftar Order
    }
```

## Statement

Statements are used as button logic actions or to retrieve data from query.

### Query

Query can have parameters or without parameter. Query have two types, depends on type of data parameters provided.

Query written by following syntax

`query` `<single quote>` `<query label>` `<single quote>` `<parameter(s)> (optional)`

#### Single Row Query

This type of query sends empty or only one row data. Empty query declared without parameters or empty parenthesis.

Example
```
query 'Get Last User'

query 'Get Last User' ()
```

Single row query with parameters declared by write all key value pair of target and source data inside parenthesis.

Example
```
query 'Get User by ID' ($1 = some_variable.id, $2 = another_variable.id)

query 'Get User by ID' (
  $1 = some_variable.id, 
  $2 = another_variable.id
)
```

#### Multi Rows Query

Multi rows query send rows data as parameters of query. Multi rows query using `square brackets` instead of parenthesis and specify `source table data`.

Example
```
query 'Insert Multiple User' (list_user) [$1 = list_user.name, $2 = list_user.address, $3 = $company_id]

query 'Insert Multiple User' (list_user) [
  $1 = list_user.name,
  $2 = list_user.address,
  $3 = $company_id
]
```

As example above, query will extract data from `list_user` table, column `name` into `$1` and column `address` into `$2` as query parameters data, except `$3` will be assigned from `page param` `company_id`.

### Variable Assignment

Variable have to be declared on `[data]` section first before assigned by a value of `row` or `table`. Variable assignment need to specify its type (table or row) following by its variable name and new value.

Variable value can be either empty row, empty table, or query.

```
row user = ()
table list_product = []
row fetched_user = query 'Get Last User'
table list_fetched_product = query 'Get All Table'
```

### Goto Page

Goto action move page into another page by its page's name. Goto statement require page name and page parameter (if available) as parameters.

```
goto List User

goto List User ()

goto List User ($id = user.id)

goto List User ($id = user.id, $company_id = company.id)

goto List User (
  $id = user.id, 
  $company_id = company.id
)
```

### Confirm

Confirm shows confirmation dialog with label/text as parameter. If confirm cancelled by user all following statement executions will not be executed.

```
page My First Page
  [param]
    $id

  [data]
    ...

  [view]
    button Hapus Order {
      query 'Send Analytic Data'
      confirm Yakin menghapus order ini?
      query 'Hapus order by id' ($1 = $id)
      goto Daftar Order
    }
```

As example above, if user cancel confirm statement, next statements (on this case are query and goto statements) will not be executed.

### Alert

Alert shows alert dialog with label/text as parameter.

```
alert Data berhasil ditambahkan
```

## Full Code Example

Look at [sample.sira](sample.sira)