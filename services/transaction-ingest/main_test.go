package main

import (
    "context"
    "testing"
)

func TestHandler(t *testing.T) {
    t.Skip("AWS credentials not available in test environment")
}

// ctxBackground is isolated for testing
func ctxBackground() context.Context { return context.Background() }
