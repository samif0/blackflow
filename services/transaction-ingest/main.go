package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "syscall"
    "time"

    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go-v2/aws"
    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/service/dynamodb"
    "github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

// Transaction represents a normalized transaction item
type Transaction struct {
    AccountID   string  `json:"account_id"`
    Type        string  `json:"type"`
    ISOCurrency string  `json:"iso_currency"`
    Amount      float64 `json:"amount"`
    Date        string  `json:"date"`
    Category    string  `json:"category"`
    Name        string  `json:"name"`
}

// Response returned to the caller
type Response struct {
    NewItems int    `json:"new_items"`
    Cursor   string `json:"cursor"`
}

var (
    ddb    *dynamodb.Client
    table  string
    plaidSecret string
)

func init() {
    cfg, err := config.LoadDefaultConfig(context.Background())
    if err != nil {
        log.Fatalf("failed to load AWS config: %v", err)
    }
    ddb = dynamodb.NewFromConfig(cfg)
    table = getenv("TRANSACTIONS_TABLE", "Transactions")
    plaidSecret = getenv("PLAID_SECRET", "")
}

func getenv(key, def string) string {
    if v := getenvRaw(key); v != "" {
        return v
    }
    return def
}

func getenvRaw(key string) string {
    if v, ok := syscallEnv(key); ok {
        return v
    }
    return ""
}

// syscallEnv is isolated for testing
var syscallEnv = func(key string) (string, bool) { return syscall.Getenv(key) }

func handler(ctx context.Context, evt json.RawMessage) (Response, error) {
    log.Printf("starting sync event")

    // Simulate Plaid calls - in real implementation we'd call Plaid API using plaidSecret
    txns := []Transaction{
        {AccountID: "demo", Type: "debit", ISOCurrency: "USD", Amount: 10.0, Date: time.Now().Format("2006-01-02"), Category: "food", Name: "Sandwich"},
    }

    var newItems int
    for _, t := range txns {
        item := map[string]types.AttributeValue{
            "user_id":   &types.AttributeValueMemberS{Value: "demo-user"},
            "date":      &types.AttributeValueMemberS{Value: t.Date},
            "account_id": &types.AttributeValueMemberS{Value: t.AccountID},
            "type":       &types.AttributeValueMemberS{Value: t.Type},
            "iso_currency": &types.AttributeValueMemberS{Value: t.ISOCurrency},
            "amount":     &types.AttributeValueMemberN{Value: fmt.Sprintf("%f", t.Amount)},
            "category":   &types.AttributeValueMemberS{Value: t.Category},
            "name":       &types.AttributeValueMemberS{Value: t.Name},
        }
        _, err := ddb.PutItem(ctx, &dynamodb.PutItemInput{
            TableName: aws.String(table),
            Item:      item,
        })
        if err != nil {
            return Response{}, fmt.Errorf("put item: %w", err)
        }
        newItems++
    }

    return Response{NewItems: newItems, Cursor: time.Now().Format(time.RFC3339)}, nil
}

func main() {
    lambda.Start(handler)
}

