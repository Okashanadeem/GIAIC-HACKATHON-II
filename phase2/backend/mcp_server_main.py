"""Standalone MCP Server entry point for Vercel deployment.

This file runs ONLY the MCP Server (Streamable HTTP) without the FastAPI app.
Deploy this separately on Vercel for reliable MCP connections.

Usage:
    python mcp_server_main.py

The server will be available at:
    - SSE: /mcp/sse
    - Messages: /mcp/messages
    - Full URL: https://your-mcp-project.vercel.app/mcp/mcp
"""

from mcp.server.fastmcp import FastMCP

# Import the MCP instance from our existing module
from app.services.mcp_server import mcp

# Import tools so they get registered
from app.services.mcp_server import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)


def main():
    """Run the MCP server with streamable HTTP transport."""
    print("Starting MCP Server...")
    print(f"Server name: {mcp.name}")
    print("Endpoints:")
    print("  - SSE: /mcp/sse")
    print("  - Messages: /mcp/messages")
    print("  - Full URL: /mcp/mcp")

    # Run with streamable HTTP - serves at /mcp internally
    mcp.run(transport="streamable_http")


if __name__ == "__main__":
    main()
